import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useSearchParams} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {SPORTS} from '~/data/sports';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Fetch all blogs and their articles from Shopify
  const {blogs} = await storefront.query(BLOGS_QUERY);

  // Flatten all articles from all blogs
  const articles: Array<{
    id: string;
    handle: string;
    title: string;
    excerpt: string | null;
    publishedAt: string;
    image: {url: string; altText: string | null} | null;
    blog: {handle: string; title: string};
    author: {name: string} | null;
  }> = [];

  if (blogs?.nodes) {
    for (const blog of blogs.nodes) {
      if (blog.articles?.nodes) {
        for (const article of blog.articles.nodes) {
          articles.push({
            id: article.id,
            handle: article.handle,
            title: article.title,
            excerpt: article.excerpt,
            publishedAt: article.publishedAt,
            image: article.image,
            blog: {handle: blog.handle, title: blog.title},
            author: article.author,
          });
        }
      }
    }
  }

  // Sort by published date (newest first)
  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return json({articles, blogs: blogs?.nodes || []});
}

export function meta() {
  return [{title: 'Articles | FitnessHeals'}];
}

// Fallback sport images for blogs that don't have images
const SPORT_IMAGES: Record<string, string> = {
  pickleball: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop',
  running: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1461896836934-fffcb290d082?w=600&h=400&fit=crop';

export default function ArticlesIndex() {
  const {articles, blogs} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const blogFilter = searchParams.get('blog');

  // Filter articles by blog if filter is set
  const filteredArticles = blogFilter
    ? articles.filter(article => article.blog.handle === blogFilter)
    : articles;

  const currentBlog = blogFilter
    ? blogs.find((b: any) => b.handle === blogFilter)
    : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Expert Knowledge</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            {currentBlog ? currentBlog.title : 'Sports Training Articles'}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            In-depth guides, training tips, and gear recommendations to help you excel in your sport.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} available
          </div>
        </div>
      </section>

      {/* Blog Filter */}
      {blogs.length > 0 && (
        <section className="py-6 px-6 md:px-12 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/articles"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !blogFilter
                    ? 'bg-brand-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Articles ({articles.length})
              </Link>
              {blogs.map((blog: any) => {
                const count = articles.filter((a: any) => a.blog.handle === blog.handle).length;
                if (count === 0) return null;
                return (
                  <Link
                    key={blog.handle}
                    to={`/articles?blog=${blog.handle}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      blogFilter === blog.handle
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {blog.title} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Articles List */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600 mb-4">
                Add articles in your Shopify admin under Online Store &gt; Blog posts.
              </p>
              <Link
                to="/sports"
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-brand-orange transition-colors"
              >
                Browse Sports Instead
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-brand-red to-brand-orange">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Gear Up?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Put your knowledge into action with premium sports equipment from FitnessHeals.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Shop All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Article Card Component
function ArticleCard({article}: {article: any}) {
  const imageUrl = article.image?.url || SPORT_IMAGES[article.blog.handle] || DEFAULT_IMAGE;

  // Calculate read time (rough estimate: 200 words per minute)
  const readTime = '5 min read';

  // Format date
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      to={`/blogs/${article.blog.handle}/${article.handle}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Card Image */}
      <div className="relative h-40 overflow-hidden">
        {article.image ? (
          <Image
            data={article.image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
            <span className="bg-brand-red px-2 py-0.5 rounded-full font-semibold">
              {article.blog.title}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-brand-red transition-colors line-clamp-2">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-5 py-4 flex-1 flex flex-col">
        {article.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-brand-red font-semibold text-sm group-hover:text-brand-orange transition-colors flex items-center gap-1">
            Read Article
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <span className="text-xs text-gray-400">{publishedDate}</span>
        </div>
      </div>
    </Link>
  );
}

const BLOGS_QUERY = `#graphql
  query Blogs {
    blogs(first: 20) {
      nodes {
        handle
        title
        articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            id
            handle
            title
            excerpt
            publishedAt
            image {
              url
              altText
            }
            author {
              name
            }
          }
        }
      }
    }
  }
` as const;
