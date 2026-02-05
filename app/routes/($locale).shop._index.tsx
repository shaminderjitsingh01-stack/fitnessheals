import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import type {
  Filter,
  ProductCollectionSortKeys,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Pagination,
  flattenConnection,
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

  // Parse filters from URL
  const filters = [...searchParams.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [] as ProductFilter[],
  );

  // Query using a collection to get filters (using "all" or first available collection)
  const {collection, collections} = await context.storefront.query(
    SHOP_COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle: 'all', // Use "all" collection or fallback
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  // If no "all" collection, try getting products directly
  if (!collection) {
    const {products} = await context.storefront.query(
      SHOP_ALL_PRODUCTS_QUERY,
      {
        variables: {
          ...paginationVariables,
          sortKey: sortKey as any,
          reverse,
          country: context.storefront.i18n.country,
          language: context.storefront.i18n.language,
        },
      },
    );

    return json({
      collection: null,
      products,
      appliedFilters: [],
      collections: collections ? flattenConnection(collections) : [],
      seo: seoPayload.home({url: request.url}),
    });
  }

  // Process applied filters
  const allFilterValues = collection.products.filters.flatMap(
    (filter) => filter.values,
  );

  const appliedFilters = filters
    .map((filter) => {
      const foundValue = allFilterValues.find((value) => {
        const valueInput = JSON.parse(value.input as string) as ProductFilter;
        if (valueInput.price && filter.price) {
          return true;
        }
        return JSON.stringify(valueInput) === JSON.stringify(filter);
      });
      if (!foundValue) {
        return null;
      }

      if (foundValue.id === 'filter.v.price') {
        const input = JSON.parse(foundValue.input as string) as ProductFilter;
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';

        return {
          filter,
          label,
        };
      }
      return {
        filter,
        label: foundValue.label,
      };
    })
    .filter((filter): filter is NonNullable<typeof filter> => filter !== null);

  const seo = seoPayload.home({url: request.url});

  return json({
    collection,
    products: null,
    appliedFilters,
    collections: flattenConnection(collections),
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Shop() {
  const {collection, products, appliedFilters, collections} = useLoaderData<typeof loader>();

  // Use collection products if available, otherwise fallback to direct products query
  const productConnection = collection?.products || products;
  const filters = collection?.products?.filters || [];

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
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full text-sm font-semibold">
              {productConnection?.nodes?.length || 0}+ Products
            </span>
          </div>
        </div>
      </section>

      {/* Products Section with Filters */}
      <section className="py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SortFilter
            filters={filters as Filter[]}
            appliedFilters={appliedFilters}
            collections={collections}
          >
            <Pagination connection={productConnection}>
              {({
                nodes,
                isLoading,
                PreviousLink,
                NextLink,
                hasNextPage,
                hasPreviousPage,
              }) => (
                <>
                  {hasPreviousPage && (
                    <div className="flex items-center justify-center mb-6">
                      <Button as={PreviousLink} variant="secondary">
                        {isLoading ? 'Loading...' : 'Load previous'}
                      </Button>
                    </div>
                  )}

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

                  {hasNextPage && (
                    <div className="flex items-center justify-center mt-8">
                      <Button as={NextLink} variant="secondary">
                        {isLoading ? 'Loading...' : 'Load more products'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Pagination>
          </SortFilter>
        </div>
      </section>
    </>
  );
}

function getSortValuesFromParam(sortParam: SortParam | null): {
  sortKey: ProductCollectionSortKeys;
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
        sortKey: 'CREATED',
        reverse: true,
      };
    default:
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
  }
}

const SHOP_COLLECTION_QUERY = `#graphql
  query ShopCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
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
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

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
