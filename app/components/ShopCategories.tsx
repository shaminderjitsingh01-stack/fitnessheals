import {Link} from '@remix-run/react';

const CATEGORIES = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'Performance clothing for every sport',
    icon: '👕',
  },
  {
    name: 'Gear',
    slug: 'gear',
    description: 'Equipment and accessories',
    icon: '🎒',
  },
];

export function ShopCategories() {
  return (
    <section className="py-12 px-6 md:px-12 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Shop Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/shop/${category.slug}`}
              className="group relative flex items-center p-8 md:p-12 rounded-2xl bg-contrast border border-primary/10 hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-5xl mb-4 block">{category.icon}</span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                  {category.name}
                </h3>
                <p className="text-primary/60">{category.description}</p>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                {category.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
