import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Videos | FitnessHeals'}];
};

// Training videos with real YouTube IDs
const TRAINING_VIDEOS = [
  {
    title: 'Soccer Dribbling Skills Tutorial',
    youtubeId: 'naEccnjzLxM',
    sport: 'Soccer',
    description: 'Learn essential dribbling techniques including the step-over, Cruyff turn, and elastico.',
  },
  {
    title: 'Basketball Shooting Fundamentals',
    youtubeId: 'UcnB9e5O5NY',
    sport: 'Basketball',
    description: 'Perfect your shooting form with proper hand placement, follow-through, and footwork.',
  },
  {
    title: 'Swimming Freestyle Technique',
    youtubeId: 'AQy_c30lNjI',
    sport: 'Swimming',
    description: 'Improve your freestyle stroke efficiency with proper body rotation and breathing.',
  },
  {
    title: 'Triathlon Training Overview',
    youtubeId: 'vdreP5AlUfY',
    sport: 'Triathlon',
    description: 'Complete triathlon preparation covering swim, bike, and run disciplines.',
  },
  {
    title: 'Cricket Batting Masterclass',
    youtubeId: 'xN1S3j-UbEs',
    sport: 'Cricket',
    description: 'Master batting techniques with professional tips on stance, grip, and shot selection.',
  },
  {
    title: 'Tennis Serve Tutorial',
    youtubeId: 'mh84ctWa2eo',
    sport: 'Tennis',
    description: 'Develop a powerful and accurate serve with proper toss, swing, and follow-through.',
  },
  {
    title: 'Running Form and Technique',
    youtubeId: 'wRkeBVMQSgg',
    sport: 'Running',
    description: 'Optimize your running form to improve efficiency and prevent injuries.',
  },
  {
    title: 'Muay Thai Basic Combinations',
    youtubeId: 'Gx9kDLCXPWA',
    sport: 'Muay Thai',
    description: 'Learn fundamental Muay Thai combinations for striking and defense.',
  },
  {
    title: 'Yoga for Athletes',
    youtubeId: 'v7AYKMP6rOE',
    sport: 'Yoga',
    description: 'Improve flexibility and recovery with yoga poses designed for athletes.',
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
