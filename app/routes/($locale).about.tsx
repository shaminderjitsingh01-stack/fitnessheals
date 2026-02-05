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
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-brand-red/20 text-brand-red rounded-full text-sm font-semibold mb-6">
            Est. 2024 - Singapore
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">About FitnessHeals</h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            Your trusted partner for premium sports apparel and equipment. We empower athletes across 11 different sports to achieve their personal best.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">How It All Began</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-500 space-y-6">
            <p>
              FitnessHeals was born from a simple observation: athletes deserve better. Too often, finding quality sports gear meant compromising - either settling for subpar equipment or paying premium prices at specialty stores with limited selection.
            </p>
            <p>
              Founded in Singapore in 2024, we set out to create a destination where athletes of all levels could find premium equipment across multiple sports, all in one place. Whether you're a weekend warrior picking up cricket for the first time, a dedicated marathon runner, or a Muay Thai enthusiast, we believe you deserve gear that matches your ambition.
            </p>
            <p>
              Today, FitnessHeals serves athletes across 11 different sports, carefully curating products that meet our rigorous standards for quality, performance, and value. We're not just selling gear - we're building a community of athletes who share our passion for fitness and sport.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to premium sports equipment by offering curated, high-quality gear at fair prices. We believe every athlete - regardless of skill level or budget - deserves equipment that enhances their performance and keeps them safe during training and competition.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Southeast Asia's most trusted multi-sport equipment destination, known for our uncompromising quality standards, expert guidance, and genuine passion for helping athletes succeed. We envision a future where FitnessHeals is synonymous with athletic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports We Cover */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">11 Sports, One Destination</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              From bat-and-ball sports to combat arts, from individual pursuits to team games - we've got you covered.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {SPORTS.map((sport) => (
              <Link
                key={sport.slug}
                to={`/sports/${sport.slug}`}
                className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all group"
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="font-semibold text-gray-800 group-hover:text-brand-red transition-colors">{sport.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality First</h3>
              <p className="text-gray-600 text-sm">
                Every product we stock undergoes rigorous vetting. We partner only with brands that share our commitment to excellence and durability.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Athlete Focused</h3>
              <p className="text-gray-600 text-sm">
                We're athletes ourselves. Every decision we make - from product selection to customer service - is informed by real sporting experience.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Trust & Transparency</h3>
              <p className="text-gray-600 text-sm">
                Honest pricing, clear product information, and straightforward policies. No hidden fees, no misleading claims - just straightforward service.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600 text-sm">
                Beyond selling gear, we're building a community of sports enthusiasts who inspire and support each other on their fitness journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">The FitnessHeals Advantage</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Why Athletes Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Curated Selection</h3>
                <p className="text-gray-600 text-sm">We don't stock everything - just the best. Our team tests and evaluates products before they make it to our shelves.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fair Pricing</h3>
                <p className="text-gray-600 text-sm">Quality gear doesn't have to break the bank. We work directly with brands to offer competitive prices without compromising quality.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">Not sure what you need? Our team of sports enthusiasts is here to help you find the perfect gear for your level and goals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
                <p className="text-gray-600 text-sm">Free shipping on orders over $75. Most orders ship within 24 hours so you can get back to training faster.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
                <p className="text-gray-600 text-sm">Not satisfied? Return within 30 days for a full refund. No questions asked, no restocking fees.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Secure Shopping</h3>
                <p className="text-gray-600 text-sm">Shop with confidence. Your payment information is protected with industry-leading encryption and security protocols.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-brand-red to-brand-orange text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Elevate Your Game?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of athletes who trust FitnessHeals for their sporting needs. Browse our collection and find the perfect gear for your next challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-white text-brand-red font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
