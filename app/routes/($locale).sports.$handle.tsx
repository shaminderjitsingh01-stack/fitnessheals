import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {SPORTS} from '~/data/sports';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Link} from '~/components/Link';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const sport = data?.sport;
  return [{title: sport ? `${sport.name} | FitnessHeals` : 'Sport | FitnessHeals'}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const sport = SPORTS.find((s) => s.slug === handle);

  if (!sport) {
    throw new Response('Sport not found', {status: 404});
  }

  const {language, country} = context.storefront.i18n;

  // Try to fetch products from a collection with the sport name
  const products = context.storefront
    .query(SPORT_PRODUCTS_QUERY, {
      variables: {
        handle: sport.slug,
        country,
        language,
      },
    })
    .catch(() => null);

  return defer({sport, products});
}

export default function SportPage() {
  const {sport, products} = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-20 px-6 md:px-12"
        style={{
          background: `linear-gradient(135deg, ${sport.color}20 0%, ${sport.color}05 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-8xl mb-6 block">{sport.icon}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{sport.name}</h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg mb-8">
            Discover premium {sport.name.toLowerCase()} gear and apparel designed for performance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to={`/collections/${sport.slug}`}
              className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
            >
              Shop {sport.name}
            </Link>
            <Link
              to={`/articles?sport=${sport.slug}`}
              className="inline-block px-6 py-3 bg-primary/10 font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <Suspense fallback={<div className="py-12 text-center">Loading products...</div>}>
          <Await resolve={products}>
            {(response) => {
              if (!response?.collection?.products?.nodes?.length) {
                return (
                  <div className="py-12 px-6 text-center">
                    <p className="text-primary/60 mb-4">
                      No products yet for {sport.name}. Check back soon!
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
                    >
                      Browse All Products
                    </Link>
                  </div>
                );
              }
              return (
                <ProductSwimlane
                  products={response.collection.products}
                  title={`${sport.name} Products`}
                  count={12}
                />
              );
            }}
          </Await>
        </Suspense>
      </section>
    </div>
  );
}

const SPORT_PRODUCTS_QUERY = `#graphql
  query sportProducts($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      products(first: 12) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
