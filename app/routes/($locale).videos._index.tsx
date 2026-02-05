import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {VideoCard} from '~/components/YouTubeEmbed';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Videos | FitnessHeals'}];
};

// Placeholder videos - will be replaced with metaobject data
const PLACEHOLDER_VIDEOS = [
  {
    videoId: 'dQw4w9WgXcQ', // Placeholder - replace with real video IDs
    title: 'Introduction to Cricket - Getting Started',
    sport: 'Cricket',
  },
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'Pickleball Basics for Beginners',
    sport: 'Pickleball',
  },
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'Essential Running Techniques',
    sport: 'Running',
  },
];

export default function VideosIndex() {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Video Channel
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Watch tutorials, training tips, and gear reviews from our experts.
          </p>
        </div>

        {/* Sport Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link
            to="/videos"
            className="px-4 py-2 rounded-full bg-brand-red text-white text-sm font-medium"
          >
            All Videos
          </Link>
          {SPORTS.slice(0, 6).map((sport) => (
            <Link
              key={sport.slug}
              to={`/videos?sport=${sport.slug}`}
              className="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              {sport.icon} {sport.name}
            </Link>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_VIDEOS.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>

        {/* Empty state */}
        <div className="text-center py-12 border-t border-primary/10 mt-12">
          <p className="text-primary/60 mb-4">
            More videos coming soon! Add videos via Shopify metaobjects.
          </p>
          <a
            href="https://www.youtube.com/@fitnessheals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
