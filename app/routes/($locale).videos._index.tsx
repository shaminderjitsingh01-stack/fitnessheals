import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Videos | FitnessHeals'}];
};

// Training videos with real YouTube IDs
const TRAINING_VIDEOS = [
  {
    title: 'Pickleball Tips for Beginners',
    youtubeId: 'fOBqXfCI_Oc',
    sport: 'Pickleball',
    description: 'Learn essential pickleball techniques including serves, dinks, and kitchen strategy.',
  },
  {
    title: 'Pickleball Doubles Strategy',
    youtubeId: 'Nrk8sqGmJBQ',
    sport: 'Pickleball',
    description: 'Master doubles positioning, third-shot drops, and net play to dominate the court.',
  },
  {
    title: 'Pickleball Paddle Selection Guide',
    youtubeId: 'Y3q3KXGM-IY',
    sport: 'Pickleball',
    description: 'How to choose the right pickleball paddle for your playing style and skill level.',
  },
  {
    title: 'Running Form and Technique',
    youtubeId: 'wRkeBVMQSgg',
    sport: 'Running',
    description: 'Optimize your running form to improve efficiency and prevent injuries.',
  },
  {
    title: 'Speed Training Drills for Runners',
    youtubeId: 'aYGvR1TBKp4',
    sport: 'Running',
    description: 'Increase your pace with sprint intervals and plyometric exercises.',
  },
  {
    title: 'Marathon Training Tips',
    youtubeId: 'jMYKR3cGMz0',
    sport: 'Running',
    description: 'Complete marathon preparation covering training plans, nutrition, and race day strategy.',
  },
];

export default function VideosIndex() {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Training Videos
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Watch tutorials, training tips, and technique guides from sports experts.
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
          {SPORTS.map((sport) => (
            <Link
              key={sport.slug}
              to={`/videos?sport=${sport.slug}`}
              className="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              {sport.icon} {sport.name}
            </Link>
          ))}
        </div>

        {/* Videos Grid - Embedded */}
        <div className="grid md:grid-cols-2 gap-8">
          {TRAINING_VIDEOS.map((video, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative bg-black" style={{paddingTop: '56.25%'}}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-brand-red/10 text-brand-red rounded-full mb-3">
                  {video.sport}
                </span>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
