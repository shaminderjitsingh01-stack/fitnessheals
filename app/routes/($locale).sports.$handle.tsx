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

// Sport-specific articles data with CTAs
const SPORT_ARTICLES: Record<string, Array<{
  title: string;
  sections: Array<{heading: string; content: string}>;
  tips: string[];
  readTime: string;
  cta: {text: string; description: string};
}>> = {
  pickleball: [
    {
      title: 'The Complete Pickleball Training Guide',
      readTime: '8 min read',
      sections: [
        {
          heading: 'Mastering the Dink',
          content: 'The dink is the most important shot in pickleball. Stand at the kitchen line with your paddle out front. Use a soft grip and push the ball gently over the net, landing it in your opponent\'s kitchen. Practice cross-court dinks for consistency, then add down-the-line dinks to keep opponents guessing.',
        },
        {
          heading: 'Serve and Return Strategy',
          content: 'A deep, consistent serve sets up your third-shot strategy. Aim for the back third of the court and vary placement between backhand and body serves. On the return, hit deep to give yourself time to advance to the kitchen line. The return of serve is your ticket to the net.',
        },
        {
          heading: 'The Third Shot Drop',
          content: 'The third shot drop is what separates beginners from intermediate players. After serving, your team is at the baseline while opponents are at the net. A soft drop shot into the kitchen neutralizes their advantage and lets you move forward. Practice from various distances until it becomes automatic.',
        },
      ],
      tips: ['Practice dinking for 15 minutes every session', 'Always move to the kitchen line as quickly as possible', 'Patience wins rallies - avoid attacking low balls'],
      cta: {text: 'Shop Pickleball Paddles & Gear', description: 'Get premium pickleball equipment to elevate your game'},
    },
    {
      title: 'Pickleball Equipment Guide: Choosing the Right Gear',
      readTime: '6 min read',
      sections: [
        {
          heading: 'Selecting Your Paddle',
          content: 'Paddle choice significantly impacts your game. Graphite paddles are lightweight with excellent control. Composite paddles offer a balance of power and touch. Carbon fiber paddles provide the most pop. Consider weight (6-8.5 oz), grip size, and paddle shape (elongated for reach vs standard for sweet spot).',
        },
        {
          heading: 'Choosing the Right Balls',
          content: 'Indoor balls have larger holes and are softer, traveling slower through the air. Outdoor balls have smaller, more numerous holes and are harder, designed to withstand wind. Tournament play requires specific approved balls. Always carry extras as outdoor balls crack in cold weather.',
        },
        {
          heading: 'Court Shoes and Apparel',
          content: 'Proper court shoes with lateral support are essential - running shoes lack the side-to-side stability needed. Look for non-marking soles with good traction. Moisture-wicking apparel keeps you cool during intense rallies. Protective eyewear is increasingly recommended for competitive play.',
        },
      ],
      tips: ['Try different paddles before buying - many shops offer demo programs', 'Replace your paddle grip regularly for consistent feel', 'Invest in quality court shoes to prevent ankle injuries'],
      cta: {text: 'Browse Pickleball Collection', description: 'Find premium pickleball equipment for every skill level'},
    },
  ],
  running: [
    {
      title: 'Running Shoe Selection & Training Guide',
      readTime: '6 min read',
      sections: [
        {
          heading: 'Understanding Your Gait',
          content: 'Your running gait determines the type of shoe you need. Neutral runners land on the outside of the heel and roll inward slightly. Overpronators roll inward excessively and need stability shoes. Supinators roll outward and need cushioned, flexible shoes.',
        },
        {
          heading: 'Training Programs',
          content: 'Build your running base with a structured program. Start with run-walk intervals if you are new. Progress to continuous running over 4-6 weeks. Include one long run per week, tempo runs for speed, and easy recovery days.',
        },
        {
          heading: 'Injury Prevention',
          content: 'Most running injuries come from doing too much too soon. Follow the 10% rule - never increase weekly mileage by more than 10%. Stretch after runs, strengthen your core and hips, and replace shoes every 400-500 miles.',
        },
      ],
      tips: ['Run at a conversational pace for most training', 'Hydrate before, during, and after runs', 'Cross-train with cycling or swimming to reduce impact'],
      cta: {text: 'Shop Running Shoes', description: 'Find your perfect running shoes for every terrain'},
    },
    {
      title: 'Marathon Training: From First Mile to 26.2',
      readTime: '9 min read',
      sections: [
        {
          heading: 'Building Your Base',
          content: 'Before marathon training, establish a solid running foundation. You should comfortably run 15-25 miles per week for at least 3 months. This base prevents injury during the intense 16-20 week training block ahead. Focus on easy-paced miles and consistency over speed.',
        },
        {
          heading: 'The Long Run Strategy',
          content: 'Your weekly long run is the cornerstone of marathon preparation. Start at 10-12 miles and build to 20-22 miles. Run these 1-2 minutes slower than your goal marathon pace. Practice your race nutrition during long runs - aim to consume 30-60g of carbs per hour after the first hour.',
        },
        {
          heading: 'Race Day Execution',
          content: 'Start conservatively - the first half should feel easy. Stick to your practiced nutrition plan. Break the race into segments mentally. Save your push for the final 10K when most runners slow down. Trust your training and enjoy crossing that finish line.',
        },
      ],
      tips: ['Taper your mileage 2-3 weeks before race day', 'Never try anything new on race day', 'Lay out all your gear the night before'],
      cta: {text: 'Get Marathon Essentials', description: 'Premium running gear for your marathon journey'},
    },
  ],
};

// Sport-specific videos data
const SPORT_VIDEOS: Record<string, Array<{
  title: string;
  youtubeId: string;
  description: string;
}>> = {
  pickleball: [
    {title: 'Pickleball Tips for Beginners', youtubeId: 'fOBqXfCI_Oc', description: 'Learn essential pickleball techniques including serves, dinks, and kitchen strategy.'},
    {title: 'Pickleball Doubles Strategy', youtubeId: 'Nrk8sqGmJBQ', description: 'Master doubles positioning, third-shot drops, and net play to dominate the court.'},
  ],
  running: [
    {title: 'Proper Running Form', youtubeId: 'wRkeBVMQSgg', description: 'Improve your running efficiency with correct posture and foot strike.'},
    {title: 'Speed Training Drills', youtubeId: 'aYGvR1TBKp4', description: 'Increase your pace with sprint intervals and plyometric exercises.'},
  ],
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

// Sport-specific images
const SPORT_IMAGES: Record<string, string> = {
  pickleball: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop',
  running: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
};

// Blog Card Component - Card display format linking to articles
function BlogCard({article, sportSlug, sportName, sportIcon}: {article: {title: string; sections: Array<{heading: string; content: string}>; tips: string[]; readTime: string; cta: {text: string; description: string}}, sportSlug: string, sportName: string, sportIcon: string}) {
  const image = SPORT_IMAGES[sportSlug] || 'https://images.unsplash.com/photo-1461896836934-fffcb290d082?w=600&h=400&fit=crop';

  return (
    <Link
      to={`/articles?sport=${sportSlug}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Card Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
            <span className="bg-brand-red px-2 py-0.5 rounded-full font-semibold">
              {sportIcon} {sportName}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-brand-red transition-colors">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {article.sections[0]?.content.substring(0, 150)}...
        </p>

        {/* Topics Preview */}
        <div className="mt-4 flex flex-wrap gap-2">
          {article.sections.slice(0, 3).map((section, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {section.heading}
            </span>
          ))}
        </div>

        {/* Read More */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-brand-red font-semibold text-sm group-hover:text-brand-orange transition-colors flex items-center gap-1">
            Read Article
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <span className="text-xs text-gray-400">{article.tips.length} Pro Tips</span>
        </div>
      </div>
    </Link>
  );
}

export default function SportPage() {
  const {sport, products} = useLoaderData<typeof loader>();

  const articles = SPORT_ARTICLES[sport.slug] || [];
  const videos = SPORT_VIDEOS[sport.slug] || [];

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
            Discover premium {sport.name.toLowerCase()} gear, training guides, and expert videos.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to={`/collections/${sport.slug}`}
              className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
            >
              Shop {sport.name}
            </Link>
            <a
              href="#articles"
              className="inline-block px-6 py-3 bg-primary/10 font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Read Guides
            </a>
            <a
              href="#videos"
              className="inline-block px-6 py-3 bg-primary/10 font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Watch Videos
            </a>
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

      {/* Blog Articles Section */}
      {articles.length > 0 && (
        <section id="articles" className="py-16 px-6 md:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Expert Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                {sport.name} Training Articles
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                In-depth guides and expert insights to help you master every aspect of {sport.name.toLowerCase()}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, idx) => (
                <BlogCard key={idx} article={article} sportSlug={sport.slug} sportName={sport.name} sportIcon={sport.icon} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to={`/articles?sport=${sport.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
              >
                View All {sport.name} Articles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Training Videos Section */}
      {videos.length > 0 && (
        <section id="videos" className="py-16 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Watch & Learn</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                {sport.name} Training Videos
              </h2>
              <p className="text-gray-600 mt-4">
                Watch expert tutorials and improve your technique
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative bg-black" style={{paddingTop: '56.25%'}}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
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
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Elevate Your {sport.name} Game?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the best {sport.name.toLowerCase()} gear at FitnessHeals. Premium quality, competitive prices, and fast shipping.
          </p>
          <Link
            to={`/collections/${sport.slug}`}
            className="inline-block px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-brand-orange transition-colors shadow-lg"
          >
            Shop {sport.name} Now
          </Link>
        </div>
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
