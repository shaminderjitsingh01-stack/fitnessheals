import {useEffect} from 'react';
import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate, Link} from '@remix-run/react';
import {useInView} from 'react-intersection-observer';
import type {
  Filter,
  ProductSortKeys,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';

import {Button} from '~/components/Button';
import {ProductCard} from '~/components/ProductCard';
import {SortFilter, type SortParam, FILTER_URL_PREFIX} from '~/components/SortFilter';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {getImageLoadingPriority} from '~/lib/const';
import {parseAsCurrency} from '~/lib/utils';
import {SPORTS} from '~/data/sports';

export const headers = routeHeaders;

export async function loader({request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });
  const locale = context.storefront.i18n;

  const searchParams = new URL(request.url).searchParams;

  const {sortKey, reverse} = getSortValuesFromParam(
    searchParams.get('sort') as SortParam,
  );

  const {products} = await context.storefront.query(
    SHOP_ALL_PRODUCTS_QUERY,
    {
      variables: {
        ...paginationVariables,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  if (!products) {
    throw new Response('products', {status: 404});
  }

  const seo = seoPayload.home({url: request.url});

  return json({
    products,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Shop() {
  const {products} = useLoaderData<typeof loader>();
  const {ref, inView} = useInView();

  return (
    <>
      {/* Shop Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Shop</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Browse our complete collection of premium sports apparel and equipment
          </p>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full text-sm font-semibold">
              {products.nodes?.length || 0}+ Products
            </span>
            {/* Sport Quick Filters */}
            {SPORTS.slice(0, 6).map((sport) => (
              <Link
                key={sport.slug}
                to={`/collections/${sport.slug}`}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-sm transition-colors"
              >
                {sport.icon} {sport.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  if (e.target.value) {
                    url.searchParams.set('sort', e.target.value);
                  } else {
                    url.searchParams.delete('sort');
                  }
                  window.location.href = url.toString();
                }}
                defaultValue={new URL(typeof window !== 'undefined' ? window.location.href : 'http://localhost').searchParams.get('sort') || ''}
              >
                <option value="">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Link to="/collections/apparel" className="hover:text-brand-red transition-colors">Apparel</Link>
              <Link to="/collections/footwear" className="hover:text-brand-red transition-colors">Footwear</Link>
              <Link to="/collections/equipment" className="hover:text-brand-red transition-colors">Equipment</Link>
              <Link to="/collections/accessories" className="hover:text-brand-red transition-colors">Accessories</Link>
            </div>
          </div>

          <Pagination connection={products}>
            {({
              nodes,
              isLoading,
              PreviousLink,
              NextLink,
              nextPageUrl,
              hasNextPage,
              state,
            }) => (
              <>
                <div className="flex items-center justify-center mb-6">
                  <Button as={PreviousLink} variant="secondary" width="full">
                    {isLoading ? 'Loading...' : 'Load previous'}
                  </Button>
                </div>
                <ProductsLoadedOnScroll
                  nodes={nodes}
                  inView={inView}
                  nextPageUrl={nextPageUrl}
                  hasNextPage={hasNextPage}
                  state={state}
                />
                <div className="flex items-center justify-center mt-6">
                  <Button
                    ref={ref}
                    as={NextLink}
                    variant="secondary"
                    width="full"
                  >
                    {isLoading ? 'Loading...' : 'Load more products'}
                  </Button>
                </div>
              </>
            )}
          </Pagination>
        </div>
      </section>
    </>
  );
}

function ProductsLoadedOnScroll({
  nodes,
  inView,
  nextPageUrl,
  hasNextPage,
  state,
}: {
  nodes: any;
  inView: boolean;
  nextPageUrl: string;
  hasNextPage: boolean;
  state: any;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage) {
      navigate(nextPageUrl, {
        replace: true,
        preventScrollReset: true,
        state,
      });
    }
  }, [inView, navigate, state, nextPageUrl, hasNextPage]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" data-test="product-grid">
      {nodes.map((product: any, i: number) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={getImageLoadingPriority(i)}
          quickAdd
        />
      ))}
    </div>
  );
}

function getSortValuesFromParam(sortParam: SortParam | null): {
  sortKey: ProductSortKeys;
  reverse: boolean;
} {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED_AT',
        reverse: true,
      };
    default:
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
  }
}

const SHOP_ALL_PRODUCTS_QUERY = `#graphql
  query ShopAllProducts(
    $country: CountryCode
    $language: LanguageCode
    $sortKey: ProductSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: $sortKey,
      reverse: $reverse
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
