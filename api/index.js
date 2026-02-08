import handleRequest from '../dist/server/index.js';

export const config = {
  regions: ['sin1'],
  maxDuration: 30,
};

export default async function handler(req, res) {
  // Build env from process.env, only include defined values
  const env = {};
  const envKeys = [
    'SESSION_SECRET',
    'PUBLIC_STOREFRONT_API_TOKEN',
    'PUBLIC_STORE_DOMAIN',
    'PUBLIC_CHECKOUT_DOMAIN',
    'PRIVATE_STOREFRONT_API_TOKEN',
    'PUBLIC_STOREFRONT_ID',
    'PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID',
    'SHOP_ID',
  ];
  for (const key of envKeys) {
    if (process.env[key]) {
      env[key] = process.env[key];
    }
  }

  const ctx = {
    waitUntil: () => {},
    passThroughOnException: () => {},
  };

  try {
    // Convert Node.js request to Web Request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }
    }

    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
      duplex: 'half',
    });

    // Call the Hydrogen server handler
    const response = await handleRequest.fetch(webRequest, env, ctx);

    // Convert Web Response to Node.js response
    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      // Skip null/undefined values that might cause issues
      if (value != null) {
        res.setHeader(key, value);
      }
    }

    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('An unexpected error occurred');
  }
}
