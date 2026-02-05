import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET || 'fitnessheals-session-secret',
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || '387c811c322af51ac081e4c73c71db94',
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'fitnesshealssg.myshopify.com',
  };

  const executionContext = {
    waitUntil: (promise: Promise<any>) => {},
    passThroughOnException: () => {},
  };

  try {
    // Dynamic import of the Hydrogen server bundle
    const serverModule = await import('../dist/server/index.js');
    return await serverModule.default.fetch(request, env, executionContext);
  } catch (error) {
    console.error('Error:', error);
    return new Response('Server Error: ' + String(error), { status: 500 });
  }
}
