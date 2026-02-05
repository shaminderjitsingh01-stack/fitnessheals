import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {Link} from '@remix-run/react';
import {FitnessHero} from '~/components/FitnessHero';
import {SportsGrid} from '~/components/SportsGrid';
import {ShopCategories} from '~/components/ShopCategories';
import {NewsletterSignup} from '~/components/NewsletterSignup';
import {ProductCard} from '~/components/ProductCard';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {SPORTS} from '~/data/sports';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }

  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const [{shop}] = await Promise.all([
    context.storefront.query(HOMEPAGE_QUERY),
  ]);

  return {
    shop,
    seo: seoPayload.home({url: request.url}),
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(FEATURED_PRODUCTS_QUERY, {
      variables: {country, language},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {featuredProducts};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

// Placeholder for when no products exist (3 rows x 4 columns = 12 items)
function BestsellerPlaceholder() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="group">
          <div className="aspect-square bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">Product {i}</p>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

// Comprehensive sports guides with full content (Blog format)
const SPORTS_GUIDES = [
  {
    title: 'The Complete Cricket Training Guide',
    sport: 'Cricket',
    sportSlug: 'cricket',
    icon: '🏏',
    readTime: '8 min read',
    excerpt: 'Master your batting technique, bowling fundamentals, and fielding excellence with proven drills used by professional cricketers.',
    sections: [
      {
        heading: 'Essential Batting Drills',
        content: 'Master your batting technique with these proven drills used by professional cricketers. Start with the forward defensive stance, keeping your head still and eyes level. Practice the drive by stepping into the ball with your front foot, keeping your elbow high and following through towards the target.',
      },
      {
        heading: 'Bowling Fundamentals',
        content: 'Develop a consistent bowling action by focusing on your run-up rhythm. Keep your non-bowling arm high for balance, and follow through completely after release. Practice seam position for swing bowling and wrist position for spin variations.',
      },
      {
        heading: 'Fielding Excellence',
        content: 'Great fielders win matches. Work on your ground fielding by staying low with soft hands. Practice catching at different heights and distances. Develop quick reflexes with reaction drills and improve your throwing accuracy with target practice.',
      },
    ],
    tips: ['Practice 30 minutes of batting drills daily', 'Video record your bowling action for analysis', 'Work on fitness - cricket demands endurance'],
    cta: {text: 'Shop Cricket Gear', description: 'Get professional-grade cricket equipment'},
  },
  {
    title: 'Running Shoe Selection Guide',
    sport: 'Running',
    sportSlug: 'running',
    icon: '🏃',
    readTime: '6 min read',
    excerpt: 'Understand your gait, choose the right shoes for your terrain, and learn proper fit and sizing for optimal performance.',
    sections: [
      {
        heading: 'Understanding Your Gait',
        content: 'Your running gait determines the type of shoe you need. Neutral runners land on the outside of the heel and roll inward slightly. Overpronators roll inward excessively and need stability shoes. Supinators roll outward and need cushioned, flexible shoes.',
      },
      {
        heading: 'Choosing by Terrain',
        content: 'Road running shoes have smooth, flexible soles for pavement. Trail shoes feature aggressive treads and protective toe caps for rough terrain. Track spikes offer minimal weight with maximum grip for competitive racing.',
      },
      {
        heading: 'Fit and Sizing',
        content: 'Always try shoes in the afternoon when feet are slightly swollen. Leave a thumb\'s width between your longest toe and the shoe end. The heel should fit snugly without slipping. Walk and jog in-store before purchasing.',
      },
    ],
    tips: ['Replace shoes every 400-500 miles', 'Rotate between 2-3 pairs to extend lifespan', 'Consider custom orthotics for arch support issues'],
    cta: {text: 'Shop Running Shoes', description: 'Find your perfect running shoes'},
  },
  {
    title: 'Muay Thai Beginner\'s Handbook',
    sport: 'Muay Thai',
    sportSlug: 'muay-thai',
    icon: '🥊',
    readTime: '10 min read',
    excerpt: 'Learn the art of eight limbs with essential techniques, kicks, and conditioning tips for Muay Thai beginners.',
    sections: [
      {
        heading: 'The Art of Eight Limbs',
        content: 'Muay Thai uses fists, elbows, knees, and shins as weapons. Begin with a proper fighting stance: feet shoulder-width apart, hands protecting your face, chin tucked. Learn the basic punches (jab, cross, hook, uppercut) before progressing to kicks and knees.',
      },
      {
        heading: 'Essential Kicks',
        content: 'The roundhouse kick is Muay Thai\'s signature technique. Pivot on your supporting foot, swing your hip through, and strike with your shin, not your foot. The teep (push kick) is your range-finder and defensive tool - snap it out from your hip to create distance.',
      },
      {
        heading: 'Training and Conditioning',
        content: 'Muay Thai fighters are among the fittest athletes. Include skipping rope for footwork, heavy bag work for power, pad work for timing, and clinch practice for close-range dominance. Stretch thoroughly to prevent injuries.',
      },
    ],
    tips: ['Start with 2-3 classes per week', 'Invest in quality shin guards and gloves', 'Stay hydrated - training is intense'],
    cta: {text: 'Shop Muay Thai Gear', description: 'Professional equipment for fighters'},
  },
];

// Training videos with YouTube embed IDs
const TRAINING_VIDEOS = [
  {
    title: 'Soccer Dribbling Skills Tutorial',
    youtubeId: 'naEccnjzLxM',
    sport: 'Soccer',
    description: 'Learn essential dribbling techniques including the step-over, Cruyff turn, and elastico.',
  },
  {
    title: 'Basketball Shooting Fundamentals',
    youtubeId: 'UcnB9e5O5NY',
    sport: 'Basketball',
    description: 'Perfect your shooting form with proper hand placement, follow-through, and footwork.',
  },
  {
    title: 'Swimming Freestyle Technique',
    youtubeId: 'AQy_c30lNjI',
    sport: 'Swimming',
    description: 'Improve your freestyle stroke efficiency with proper body rotation and breathing.',
  },
  {
    title: 'Triathlon Training Overview',
    youtubeId: 'vdreP5AlUfY',
    sport: 'Triathlon',
    description: 'Complete triathlon preparation covering swim, bike, and run disciplines.',
  },
];

// Blog Article Component - Full display format (not expandable)
function BlogArticle({guide}: {guide: typeof SPORTS_GUIDES[0]}) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 md:px-8 py-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3 flex-wrap">
          <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full font-semibold">
            {guide.icon} {guide.sport}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTime}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">{guide.title}</h3>
        <p className="text-gray-400 mt-2">{guide.excerpt}</p>
      </div>

      {/* Article Content */}
      <div className="px-6 md:px-8 py-6">
        <div className="space-y-6">
          {guide.sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="w-7 h-7 bg-gradient-to-r from-brand-red to-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                {section.heading}
              </h4>
              <p className="text-gray-600 leading-relaxed pl-10">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-gradient-to-r from-brand-red/5 to-brand-orange/5 rounded-xl p-5 border border-brand-red/10">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="space-y-2">
            {guide.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                <svg className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between p-5 bg-gray-50 rounded-xl">
          <p className="font-semibold text-gray-900">{guide.cta.description}</p>
          <Link
            to={`/collections/${guide.sportSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap"
          >
            {guide.cta.text}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Homepage() {
  const {featuredProducts} = useLoaderData<typeof loader>();

  return (
    <>
      <FitnessHero
        title="Gear Up for Every Sport"
        subtitle="Premium sports apparel and equipment for athletes who demand the best. From cricket to triathlon, we've got you covered."
        ctaText="Shop Now"
        ctaLink="/shop"
      />

      <SportsGrid />

      <ShopCategories />

      {/* Bestsellers Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Top Picks</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 text-brand-red font-semibold hover:text-brand-orange transition-colors inline-flex items-center gap-1"
            >
              Shop All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProducts ? (
            <Suspense fallback={<BestsellerPlaceholder />}>
              <Await resolve={featuredProducts}>
                {(response) => {
                  if (!response?.products?.nodes?.length) {
                    return <BestsellerPlaceholder />;
                  }
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {response.products.nodes.map((product: any) => (
                        <ProductCard key={product.id} product={product} quickAdd />
                      ))}
                    </div>
                  );
                }}
              </Await>
            </Suspense>
          ) : (
            <BestsellerPlaceholder />
          )}
        </div>
      </section>

      {/* Sports Guides Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Expert Knowledge</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Sports Training Guides
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive guides written by sports professionals to help you master your craft
            </p>
          </div>

          <div className="space-y-8">
            {SPORTS_GUIDES.map((guide, idx) => (
              <BlogArticle key={idx} guide={guide} />
            ))}
          </div>

          {/* View All Articles Link */}
          <div className="text-center mt-10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-brand-red transition-colors"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Training Videos Section - Playable */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Watch & Learn</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Training Videos
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Watch expert tutorials and improve your technique across multiple sports
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TRAINING_VIDEOS.map((video, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-brand-red/10 text-brand-red rounded-full mb-3">
                    {video.sport}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}

const HOMEPAGE_QUERY = `#graphql
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    shop {
      name
      description
    }
  }
` as const;

const FEATURED_PRODUCTS_QUERY = `#graphql
  query featuredProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 12, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
