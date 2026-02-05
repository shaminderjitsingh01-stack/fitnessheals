import {type MetaFunction, type LoaderFunctionArgs, json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

// Article images
const ARTICLE_IMAGES: Record<string, string> = {
  'cricket-training-guide': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=600&fit=crop',
  'cricket-equipment-guide': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop',
  'running-shoe-guide': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=600&fit=crop',
  'marathon-training': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=600&fit=crop',
  'muay-thai-beginners': 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop',
  'muay-thai-equipment': 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=1200&h=600&fit=crop',
  'soccer-skills': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
  'soccer-boot-guide': 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&h=600&fit=crop',
  'basketball-fundamentals': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=600&fit=crop',
  'basketball-gear-guide': 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&h=600&fit=crop',
  'swimming-technique': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=600&fit=crop',
  'swimming-gear': 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=1200&h=600&fit=crop',
  'tennis-fundamentals': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=600&fit=crop',
  'tennis-racket-guide': 'https://images.unsplash.com/photo-1617083934555-a0a4c2e44eb2?w=1200&h=600&fit=crop',
  'cycling-training': 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&h=600&fit=crop',
  'cycling-gear': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&h=600&fit=crop',
  'triathlon-training': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=600&fit=crop',
  'triathlon-gear': 'https://images.unsplash.com/photo-1559311648-d7c2964bf7a4?w=1200&h=600&fit=crop',
  'golf-fundamentals': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=600&fit=crop',
  'golf-equipment': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=600&fit=crop',
  'yoga-for-athletes': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
  'yoga-equipment': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=600&fit=crop',
};

// All articles data
const ALL_ARTICLES: Array<{
  id: string;
  title: string;
  sport: string;
  sportSlug: string;
  sportIcon: string;
  readTime: string;
  excerpt: string;
  sections: Array<{heading: string; content: string}>;
  tips: string[];
  cta: {text: string; description: string};
}> = [
  {
    id: 'cricket-training-guide',
    title: 'The Complete Cricket Training Guide',
    sport: 'Cricket',
    sportSlug: 'cricket',
    sportIcon: '🏏',
    readTime: '8 min read',
    excerpt: 'Master your batting technique, bowling fundamentals, and fielding excellence with proven drills used by professional cricketers.',
    sections: [
      {
        heading: 'Essential Batting Drills',
        content: 'Master your batting technique with these proven drills used by professional cricketers. Start with the forward defensive stance, keeping your head still and eyes level. Practice the drive by stepping into the ball with your front foot, keeping your elbow high and following through towards the target. Shadow batting helps groove muscle memory - practice your shots without a ball to perfect timing and balance. Use a bowling machine or throw-downs to work on specific shots under controlled conditions.',
      },
      {
        heading: 'Bowling Fundamentals',
        content: 'Develop a consistent bowling action by focusing on your run-up rhythm. Keep your non-bowling arm high for balance, and follow through completely after release. Practice seam position for swing bowling and wrist position for spin variations. For pace bowlers, work on loading your back leg and driving through with your front leg. Spinners should focus on finger and wrist strength for better revolutions.',
      },
      {
        heading: 'Fielding Excellence',
        content: 'Great fielders win matches. Work on your ground fielding by staying low with soft hands. Practice catching at different heights and distances. Develop quick reflexes with reaction drills and improve your throwing accuracy with target practice. Include diving catches in your training to build confidence. Work on your sliding stops and quick release to pressure batsmen.',
      },
    ],
    tips: ['Practice 30 minutes of batting drills daily', 'Video record your bowling action for analysis', 'Work on fitness - cricket demands endurance', 'Practice under pressure - simulate match situations'],
    cta: {text: 'Shop Cricket Bats & Gear', description: 'Get professional-grade cricket equipment to elevate your game'},
  },
  {
    id: 'cricket-equipment-guide',
    title: 'Cricket Equipment Guide: Choosing the Right Gear',
    sport: 'Cricket',
    sportSlug: 'cricket',
    sportIcon: '🏏',
    readTime: '6 min read',
    excerpt: 'Select the perfect cricket bat, protective equipment, and bowling gear with expert guidance.',
    sections: [
      {
        heading: 'Selecting the Right Bat',
        content: 'Cricket bats come in various weights and sizes. A bat should feel balanced when you pick it up - neither too heavy in the blade nor too light. English willow is the premium choice for serious players, offering better ping and lighter weight. Kashmir willow is excellent for beginners and offers great value. Consider the bat profile - high middle for front-foot players, low middle for back-foot players.',
      },
      {
        heading: 'Protective Equipment',
        content: 'Safety first. A properly fitted helmet is essential - it should sit level and not obstruct your vision. Batting pads should cover from above the knee to below the ankle. Gloves need to offer protection without sacrificing grip and feel. Abdominal guards, thigh pads, and arm guards complete your protection.',
      },
      {
        heading: 'Bowling Gear',
        content: 'Quality cricket balls maintain their shape and seam through extended play. White balls are used in limited-overs cricket, red balls in tests. Bowling shoes need good grip and support for your front foot landing. Consider half-spikes for natural surfaces or rubber soles for artificial pitches.',
      },
    ],
    tips: ['Knock in new bats properly before match use', 'Check helmet for cracks after any impact', 'Store equipment in cool, dry conditions'],
    cta: {text: 'Shop Cricket Equipment', description: 'Premium cricket gear for all levels'},
  },
  {
    id: 'running-shoe-guide',
    title: 'Running Shoe Selection Guide',
    sport: 'Running',
    sportSlug: 'running',
    sportIcon: '🏃',
    readTime: '6 min read',
    excerpt: 'Find the perfect running shoes for your gait, terrain, and goals.',
    sections: [
      {
        heading: 'Understanding Your Gait',
        content: 'Your running gait determines the type of shoe you need. Neutral runners land on the outside of the heel and roll inward slightly - they need cushioned shoes. Overpronators roll inward excessively and need stability shoes with medial support. Supinators roll outward and need cushioned, flexible shoes. Get a gait analysis at a running store to understand your pattern.',
      },
      {
        heading: 'Choosing by Terrain',
        content: 'Road running shoes have smooth, flexible soles for pavement. Trail shoes feature aggressive treads and protective toe caps for rough terrain. Track spikes offer minimal weight with maximum grip for competitive racing. Some versatile shoes can handle light trails and roads.',
      },
      {
        heading: 'Fit and Sizing',
        content: 'Always try shoes in the afternoon when feet are slightly swollen. Leave a thumb\'s width between your longest toe and the shoe end. The heel should fit snugly without slipping. Walk and jog in-store before purchasing. Remember, running shoes often run a half size smaller than casual shoes.',
      },
    ],
    tips: ['Replace shoes every 400-500 miles', 'Rotate between 2-3 pairs to extend lifespan', 'Consider custom orthotics for arch support issues'],
    cta: {text: 'Shop Running Shoes', description: 'Find your perfect running shoes'},
  },
  {
    id: 'marathon-training',
    title: 'Marathon Training: From Couch to 42.2km',
    sport: 'Running',
    sportSlug: 'running',
    sportIcon: '🏃',
    readTime: '12 min read',
    excerpt: 'Complete marathon preparation guide covering training plans, nutrition, and race strategy.',
    sections: [
      {
        heading: 'Building Your Base',
        content: 'Marathon training requires a solid aerobic foundation. Spend 8-12 weeks building your weekly mileage before starting a specific marathon plan. The 10% rule - never increase weekly mileage by more than 10% - helps prevent injury. Include easy runs, tempo runs, and long runs in your base-building phase.',
      },
      {
        heading: 'The Training Plan',
        content: 'A typical marathon plan is 16-20 weeks. Long runs progressively increase to 20-22 miles. Include weekly tempo runs at goal pace and interval sessions for speed. Recovery weeks every 3-4 weeks allow your body to adapt. Taper the final 2-3 weeks, reducing volume while maintaining intensity.',
      },
      {
        heading: 'Nutrition and Hydration',
        content: 'Carbohydrate loading in the days before the race tops off glycogen stores. Practice your race-day nutrition during training - never try anything new on race day. Take gels or sports drinks every 45 minutes during the marathon. Aim for 4-8 oz of fluid every 15-20 minutes depending on conditions.',
      },
    ],
    tips: ['Run most training miles at conversational pace', 'Include strength training for injury prevention', 'Practice race pace in your long runs', 'Sleep is crucial - aim for 7-9 hours nightly'],
    cta: {text: 'Shop Running Gear', description: 'Everything you need for marathon training'},
  },
  {
    id: 'muay-thai-beginners',
    title: 'Muay Thai for Beginners: The Art of Eight Limbs',
    sport: 'Muay Thai',
    sportSlug: 'muay-thai',
    sportIcon: '🥊',
    readTime: '10 min read',
    excerpt: 'Start your Muay Thai journey with fundamental techniques, training tips, and essential equipment guidance.',
    sections: [
      {
        heading: 'The Art of Eight Limbs',
        content: 'Muay Thai uses fists, elbows, knees, and shins as weapons. Begin with a proper fighting stance: feet shoulder-width apart, hands protecting your face, chin tucked. Learn the basic punches (jab, cross, hook, uppercut) before progressing to kicks and knees. The teep (push kick) is your range-finder and defensive tool.',
      },
      {
        heading: 'Essential Kicks',
        content: 'The roundhouse kick is Muay Thai\'s signature technique. Pivot on your supporting foot, swing your hip through, and strike with your shin, not your foot. The teep (push kick) snaps out from your hip to create distance. Low kicks target the opponent\'s legs to reduce their mobility.',
      },
      {
        heading: 'Training and Conditioning',
        content: 'Muay Thai fighters are among the fittest athletes. Include skipping rope for footwork, heavy bag work for power, pad work for timing, and clinch practice for close-range dominance. Stretch thoroughly to prevent injuries. Conditioning your shins through gradual heavy bag work is essential.',
      },
    ],
    tips: ['Start with 2-3 classes per week', 'Invest in quality shin guards and gloves', 'Stay hydrated - training is intense', 'Focus on technique before power'],
    cta: {text: 'Shop Muay Thai Gear', description: 'Professional equipment for fighters'},
  },
  {
    id: 'muay-thai-equipment',
    title: 'Muay Thai Equipment Guide: Gear Up Like a Fighter',
    sport: 'Muay Thai',
    sportSlug: 'muay-thai',
    sportIcon: '🥊',
    readTime: '7 min read',
    excerpt: 'Choose the right gloves, shin guards, and training equipment for Muay Thai.',
    sections: [
      {
        heading: 'Boxing Gloves',
        content: 'Training gloves typically range from 12-16 oz - heavier gloves protect your hands and sparring partners. Competition gloves are 8-10 oz. Look for genuine leather for durability and proper wrist support. Velcro closures are convenient for training; lace-ups offer better wrist support for competition.',
      },
      {
        heading: 'Shin Guards',
        content: 'Shin guards are essential for sparring. Choose guards that cover from below the knee to the top of your foot. Leather guards offer better protection and durability. Slip-on style is convenient; strapped guards offer more secure fit. Break them in gradually before heavy sparring.',
      },
      {
        heading: 'Training Equipment',
        content: 'A quality heavy bag allows solo practice of all techniques. Thai pads help develop power and timing with a partner. Hand wraps protect your wrists and knuckles - learn to wrap properly. Headgear is essential for sparring, and a mouthguard is mandatory.',
      },
    ],
    tips: ['Always wrap your hands before hitting anything', 'Air out your gear after training to prevent odor', 'Replace gloves when padding starts to break down'],
    cta: {text: 'Browse Muay Thai Collection', description: 'Premium training gear for fighters'},
  },
];

export async function loader({params}: LoaderFunctionArgs) {
  const article = ALL_ARTICLES.find(a => a.id === params.articleId);

  if (!article) {
    throw new Response('Article not found', {status: 404});
  }

  // Get related articles from same sport
  const relatedArticles = ALL_ARTICLES
    .filter(a => a.sportSlug === article.sportSlug && a.id !== article.id)
    .slice(0, 2);

  return json({article, relatedArticles});
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  if (!data?.article) {
    return [{title: 'Article Not Found | FitnessHeals'}];
  }
  return [
    {title: `${data.article.title} | FitnessHeals`},
    {name: 'description', content: data.article.excerpt},
  ];
};

export default function ArticleDetail() {
  const {article, relatedArticles} = useLoaderData<typeof loader>();
  const sport = SPORTS.find(s => s.slug === article.sportSlug);
  const image = ARTICLE_IMAGES[article.id] || 'https://images.unsplash.com/photo-1461896836934-fffcb290d082?w=1200&h=600&fit=crop';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] md:h-[500px]">
        <img
          src={image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-white/70 mb-4 flex items-center gap-2">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/articles" className="hover:text-white">Articles</Link>
              <span>/</span>
              <Link to={`/articles?sport=${article.sportSlug}`} className="hover:text-white">{article.sport}</Link>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                {article.sportIcon} {article.sport}
              </span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {article.sections.map((section, idx) => (
              <div key={idx} className={idx > 0 ? 'mt-10' : ''}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Pro Tips */}
          <div className="mt-8 bg-gradient-to-r from-brand-red to-brand-orange rounded-2xl p-8 md:p-10 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Pro Tips
            </h3>
            <ul className="space-y-3">
              {article.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gray-900 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{article.cta.text}</h3>
            <p className="text-gray-400 mb-6">{article.cta.description}</p>
            <Link
              to={`/collections/${article.sportSlug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-orange transition-colors"
            >
              Shop {article.sport} Gear
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">More {article.sport} Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/articles/${related.id}`}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{related.excerpt}</p>
                  <span className="text-brand-red text-sm font-semibold mt-3 inline-flex items-center gap-1">
                    Read Article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Articles */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}
