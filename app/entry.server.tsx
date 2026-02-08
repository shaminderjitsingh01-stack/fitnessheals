import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const shopConfig: Record<string, string> = {};
  if (context.env.PUBLIC_CHECKOUT_DOMAIN) {
    shopConfig.checkoutDomain = context.env.PUBLIC_CHECKOUT_DOMAIN;
  }
  if (context.env.PUBLIC_STORE_DOMAIN) {
    shopConfig.storeDomain = context.env.PUBLIC_STORE_DOMAIN;
  }
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: shopConfig,
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://images.unsplash.com',
      'data:',
    ],
    frameSrc: [
      "'self'",
      'https://www.youtube.com',
      'https://youtube.com',
    ],
    mediaSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'data:',
      'blob:',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set(
    'Content-Security-Policy',
    header.replace(/\n/g, ' '),
  );
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
