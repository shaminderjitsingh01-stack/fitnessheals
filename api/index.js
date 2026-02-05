// Vercel Edge Function for Hydrogen
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Import the Hydrogen server bundle dynamically
  const { default: handleRequest } = await import('../dist/server/index.js');

  // Create execution context for Hydrogen
  const executionContext = {
    waitUntil: () => {},
    passThroughOnException: () => {},
  };

  // Environment variables
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET || 'fitnessheals-session-secret',
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || '387c811c322af51ac081e4c73c71db94',
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'fitnesshealssg.myshopify.com',
  };

  try {
    return await handleRequest.fetch(request, env, executionContext);
  } catch (error) {
    console.error('Hydrogen error:', error);
    return new Response('Server Error', { status: 500 });
  }
}
