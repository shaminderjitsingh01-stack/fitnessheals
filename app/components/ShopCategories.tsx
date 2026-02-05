import {Link} from '@remix-run/react';

const CATEGORIES = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'Performance clothing designed for athletes',
    tagline: 'Look good, feel good, perform better',
    icon: '👕',
    gradient: 'from-blue-600 to-indigo-700',
    items: ['Jerseys', 'Shorts', 'Jackets', 'Compression'],
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    description: 'Sport-specific shoes for maximum performance',
    tagline: 'Step up your game',
    icon: '👟',
    gradient: 'from-brand-red to-brand-orange',
    items: ['Running', 'Training', 'Court', 'Cleats'],
  },
  {
    name: 'Equipment',
    slug: 'equipment',
    description: 'Professional gear for every sport',
    tagline: 'The right tools for champions',
    icon: '🏆',
    gradient: 'from-emerald-600 to-teal-700',
    items: ['Balls', 'Rackets', 'Bats', 'Goals'],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your kit with essentials',
    tagline: 'Every detail matters',
    icon: '🎒',
    gradient: 'from-purple-600 to-pink-600',
    items: ['Bags', 'Bottles', 'Bands', 'Protection'],
  },
];

export function ShopCategories() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Shop by Category</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            Everything You Need
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From head to toe, we've got you covered with premium sports gear
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/collections/${category.slug}`}
              className={`group relative flex flex-col p-8 md:p-10 rounded-3xl bg-gradient-to-br ${category.gradient} overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <span className="text-6xl mb-4 block drop-shadow-lg">
                  {category.icon}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4">
                  {category.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-white/60 text-sm italic">
                  {category.tagline}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-all">
                  <svg className="w-5 h-5 text-white group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
