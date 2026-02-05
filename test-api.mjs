// Quick test script to verify Storefront API connection
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'https://fitnesshealssg.myshopify.com',
  apiVersion: '2024-01',
  publicAccessToken: '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',
});

const query = `{
  shop {
    name
    description
  }
}`;

try {
  const { data, errors } = await client.request(query);

  if (errors) {
    console.error('GraphQL Errors:', JSON.stringify(errors, null, 2));
  } else {
    console.log('SUCCESS! Shop data:', JSON.stringify(data, null, 2));
  }
} catch (error) {
  console.error('Request failed:', error.message);
  if (error.response) {
    console.error('Response status:', error.response.status);
  }
}
