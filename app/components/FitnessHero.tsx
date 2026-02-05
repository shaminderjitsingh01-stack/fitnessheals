import {Link} from '@remix-run/react';

interface FitnessHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function FitnessHero({
  title = 'Gear Up for Every Sport',
  subtitle = 'Premium sports apparel and equipment for athletes who demand the best. From cricket to triathlon, we\'ve got you covered.',
  ctaText = 'Shop Now',
  ctaLink = '/shop',
  backgroundImage,
}: FitnessHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-gray">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{backgroundImage: `url(${backgroundImage})`}}
        />
      )}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={ctaLink}
            className="inline-block px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
          >
            {ctaText}
          </Link>
          <Link
            to="/sports"
            className="inline-block px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-colors"
          >
            Browse Sports
          </Link>
        </div>
      </div>
    </section>
  );
}
