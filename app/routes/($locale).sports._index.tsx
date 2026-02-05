import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Sports | FitnessHeals'}];
};

export default function SportsIndex() {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop By Sport
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Find the perfect gear and apparel for your favorite sport.
            We cover 11 sports with premium equipment and clothing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPORTS.map((sport) => (
            <Link
              key={sport.slug}
              to={`/collections/${sport.slug}`}
              className="group relative flex flex-col items-center justify-center p-12 rounded-2xl bg-contrast border border-primary/10 hover:border-brand-red hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${sport.color}10 0%, transparent 100%)`,
              }}
            >
              <span className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {sport.icon}
              </span>
              <h2 className="text-2xl font-bold mb-2">{sport.name}</h2>
              <p className="text-primary/60 text-sm">Shop {sport.name} gear</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
                style={{backgroundColor: sport.color}}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
