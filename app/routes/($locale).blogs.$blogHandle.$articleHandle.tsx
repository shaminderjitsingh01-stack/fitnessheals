import {
  json,
  type MetaArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {getSeoMeta, Image, flattenConnection} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

import styles from '../styles/custom-font.css?url';

export const headers = routeHeaders;

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  invariant(params.blogHandle, 'Missing blog handle');
  invariant(params.articleHandle, 'Missing article handle');

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      articleHandle: params.articleHandle,
      language,
    },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article?.publishedAt!));

  // Fetch related articles from the same blog
  const {blog: relatedBlog} = await context.storefront.query(RELATED_ARTICLES_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      language,
    },
  });

  const relatedArticles = relatedBlog?.articles
    ? flattenConnection(relatedBlog.articles)
        .filter((a) => a.handle !== params.articleHandle)
        .slice(0, 3)
        .map((a) => ({
          ...a,
          publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(a.publishedAt!)),
        }))
    : [];

  const seo = seoPayload.article({article, url: request.url});

  return json({
    article,
    formattedDate,
    seo,
    blogHandle: params.blogHandle,
    blogTitle: relatedBlog?.title || params.blogHandle,
    relatedArticles,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Article() {
  const {article, formattedDate, blogHandle, blogTitle, relatedArticles} =
    useLoaderData<typeof loader>();

  const {title, image, contentHtml, author} = article;

  return (
    <div className="bg-white">
      {/* Article Header */}
      <header className="pt-12 pb-8 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Category Badge */}
          <Link
            to={`/blogs/${blogHandle}`}
            className="inline-block mb-4 px-4 py-1.5 bg-brand-red/10 text-brand-red text-sm font-semibold rounded-full hover:bg-brand-red/20 transition-colors"
          >
            {blogTitle}
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-center gap-4 text-gray-600">
            {author?.name && (
              <>
                <span className="font-medium text-gray-900">{author.name}</span>
                <span className="text-gray-400">•</span>
              </>
            )}
            <time>{formattedDate}</time>
          </div>
        </div>
      </header>

      {/* Featured Image - Constrained size */}
      {image && (
        <div className="px-6 md:px-8 lg:px-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                data={image}
                className="w-full h-auto max-h-[400px] object-cover"
                sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="px-6 md:px-8 lg:px-12 pb-16">
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="max-w-3xl mx-auto prose prose-lg prose-gray
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline"
        />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Related Articles
              </h2>
              <Link
                to={`/blogs/${blogHandle}`}
                className="text-brand-red font-semibold hover:text-brand-orange transition-colors flex items-center gap-1"
              >
                View All
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/blogs/${blogHandle}/${relatedArticle.handle}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {relatedArticle.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        data={relatedArticle.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {relatedArticle.publishedAt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="py-8 px-6 md:px-8 lg:px-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

const RELATED_ARTICLES_QUERY = `#graphql
  query RelatedArticles(
    $language: LanguageCode
    $blogHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      articles(first: 10, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            publishedAt
            image {
              id
              altText
              url
              width
              height
            }
          }
        }
      }
    }
  }
`;
