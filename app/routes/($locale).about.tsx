import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'About Us | FitnessHeals'}];
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-brand-dark to-brand-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FitnessHeals</h1>
          <p className="text-xl text-white/80">
            Your trusted partner for premium sports apparel and equipment across 11 different sports.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-primary/70 text-center mb-8">
            At FitnessHeals, we believe that the right gear can transform your game.
            We're dedicated to providing athletes of all levels with high-quality sports
            equipment and apparel that helps them perform at their best.
          </p>
        </div>
      </section>

      {/* Sports We Cover */}
      <section className="py-16 px-6 md:px-12 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Sports We Cover</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {SPORTS.map((sport) => (
              <Link
                key={sport.slug}
                to={`/sports/${sport.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-contrast rounded-full border border-primary/10 hover:border-brand-red transition-colors"
              >
                <span>{sport.icon}</span>
                <span className="font-medium">{sport.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-primary/60">
                We only stock products that meet our high standards for performance and durability.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Athlete Focused</h3>
              <p className="text-primary/60">
                Everything we do is designed with athletes in mind - from product selection to customer service.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-primary/60">
                We're building a community of sports enthusiasts who share our passion for fitness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Gear Up?</h2>
          <p className="text-white/70 mb-8">
            Browse our collection and find the perfect equipment for your sport.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
