import handleRequest from '../dist/server/index.js';

export const config = {
  runtime: 'edge',
  regions: ['sin1'],
};

export default async function handler(request) {
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN,
    PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID,
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
    SHOP_ID: process.env.SHOP_ID,
  };

  const ctx = {
    waitUntil: () => {},
    passThroughOnException: () => {},
  };

  return handleRequest.fetch(request, env, ctx);
}
