import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {ArticleCard} from '~/components/ArticleCard';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Articles | FitnessHeals'}];
};

// Placeholder articles - will be replaced with metaobject data
const PLACEHOLDER_ARTICLES = [
  {
    title: '10 Essential Tips for Beginner Cricketers',
    excerpt: 'Starting your cricket journey? Here are the fundamental tips every beginner should know to improve their game.',
    handle: 'cricket-beginner-tips',
    sport: 'Cricket',
    author: 'FitnessHeals Team',
    date: 'Feb 1, 2026',
  },
  {
    title: 'The Complete Guide to Pickleball Equipment',
    excerpt: 'Everything you need to know about choosing the right paddle, balls, and accessories for pickleball.',
    handle: 'pickleball-equipment-guide',
    sport: 'Pickleball',
    author: 'FitnessHeals Team',
    date: 'Jan 28, 2026',
  },
  {
    title: 'Training for Your First Triathlon',
    excerpt: 'A comprehensive training plan to help you prepare for your first triathlon event.',
    handle: 'triathlon-training-guide',
    sport: 'Triathlon',
    author: 'FitnessHeals Team',
    date: 'Jan 25, 2026',
  },
];

export default function ArticlesIndex() {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sports Articles
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Training tips, gear guides, and expert advice to help you excel in your sport.
          </p>
        </div>

        {/* Sport Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link
            to="/articles"
            className="px-4 py-2 rounded-full bg-brand-red text-white text-sm font-medium"
          >
            All Sports
          </Link>
          {SPORTS.slice(0, 6).map((sport) => (
            <Link
              key={sport.slug}
              to={`/articles?sport=${sport.slug}`}
              className="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              {sport.icon} {sport.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_ARTICLES.map((article) => (
            <ArticleCard key={article.handle} {...article} />
          ))}
        </div>

        {/* Empty state message */}
        <div className="text-center py-12 border-t border-primary/10 mt-12">
          <p className="text-primary/60">
            More articles coming soon! Add articles via Shopify metaobjects.
          </p>
        </div>
      </div>
    </div>
  );
}
