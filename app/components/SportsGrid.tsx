import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export function SportsGrid() {
  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Shop By Sport
        </h2>
        <p className="text-center text-primary/60 mb-10 max-w-2xl mx-auto">
          Find gear and apparel for your favorite sport. Quality equipment to help you perform at your best.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SPORTS.map((sport) => (
            <Link
              key={sport.slug}
              to={`/sports/${sport.slug}`}
              className="group flex flex-col items-center p-6 rounded-xl bg-contrast border border-primary/10 hover:border-brand-red hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {sport.icon}
              </span>
              <span className="font-medium text-sm text-center">{sport.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
