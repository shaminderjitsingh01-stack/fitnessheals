import {Link} from '@remix-run/react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  handle: string;
  image?: string;
  sport?: string;
  author?: string;
  date?: string;
}

export function ArticleCard({
  title,
  excerpt,
  handle,
  image,
  sport,
  author,
  date,
}: ArticleCardProps) {
  return (
    <Link
      to={`/articles/${handle}`}
      className="group block bg-contrast rounded-xl overflow-hidden border border-primary/10 hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video bg-primary/5 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/30">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        {sport && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-brand-red/10 text-brand-red rounded-full mb-3">
            {sport}
          </span>
        )}
        <h3 className="font-bold text-lg mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-primary/60 text-sm line-clamp-2 mb-4">{excerpt}</p>
        {(author || date) && (
          <div className="flex items-center text-xs text-primary/50">
            {author && <span>{author}</span>}
            {author && date && <span className="mx-2">•</span>}
            {date && <span>{date}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-contrast rounded-xl overflow-hidden border border-primary/10">
      <div className="aspect-video bg-primary/5 animate-pulse" />
      <div className="p-5">
        <div className="w-20 h-5 bg-primary/10 rounded-full mb-3 animate-pulse" />
        <div className="w-full h-6 bg-primary/10 rounded mb-2 animate-pulse" />
        <div className="w-3/4 h-4 bg-primary/10 rounded mb-4 animate-pulse" />
        <div className="w-1/2 h-3 bg-primary/10 rounded animate-pulse" />
      </div>
    </div>
  );
}
