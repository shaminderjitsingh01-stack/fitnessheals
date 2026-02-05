import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {ProductCard} from '~/components/ProductCard';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Shop | FitnessHeals'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const products = context.storefront
    .query(ALL_PRODUCTS_QUERY, {
      variables: {country, language},
    })
    .catch(() => null);

  return defer({products});
}

export default function ShopIndex() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All</h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Browse our complete collection of sports apparel and gear.
          </p>
        </div>

        {/* Category Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-lg bg-brand-red text-white font-medium"
          >
            All Products
          </Link>
          <Link
            to="/shop/apparel"
            className="px-6 py-3 rounded-lg bg-primary/10 font-medium hover:bg-primary/20 transition-colors"
          >
            Apparel
          </Link>
          <Link
            to="/shop/gear"
            className="px-6 py-3 rounded-lg bg-primary/10 font-medium hover:bg-primary/20 transition-colors"
          >
            Gear
          </Link>
        </div>

        {/* Sport Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {SPORTS.map((sport) => (
            <Link
              key={sport.slug}
              to={`/collections/${sport.slug}`}
              className="px-3 py-1.5 rounded-full bg-primary/5 text-sm hover:bg-primary/10 transition-colors"
            >
              {sport.icon} {sport.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <Await resolve={products}>
            {(response) => {
              if (!response?.products?.nodes?.length) {
                return (
                  <div className="text-center py-12">
                    <p className="text-primary/60 mb-4">
                      No products yet. Add products in Shopify Admin!
                    </p>
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {response.products.nodes.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-primary/10 rounded-lg mb-4" />
          <div className="h-4 bg-primary/10 rounded w-3/4 mb-2" />
          <div className="h-4 bg-primary/10 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query allProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 24, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
