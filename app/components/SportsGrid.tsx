import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export function SportsGrid() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Categories</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Shop By Sport
            </h2>
          </div>
          <Link
            to="/sports"
            className="mt-4 md:mt-0 text-brand-red font-semibold hover:text-brand-orange transition-colors inline-flex items-center gap-1"
          >
            View All Sports
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Sports grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SPORTS.map((sport) => (
            <Link
              key={sport.slug}
              to={`/sports/${sport.slug}`}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
              style={{backgroundColor: `${sport.color}15`}}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{backgroundColor: sport.color}}
              />

              {/* Icon */}
              <span className="relative z-10 text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg">
                {sport.icon}
              </span>

              {/* Name */}
              <span className="relative z-10 font-bold text-sm text-gray-800 group-hover:text-white transition-colors text-center">
                {sport.name}
              </span>

              {/* Arrow indicator */}
              <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
