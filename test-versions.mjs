// Test multiple API versions
const token = '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';
const store = 'fitnesshealssg.myshopify.com';
const versions = ['2025-01', '2024-10', '2024-07', '2024-04', '2024-01'];

for (const version of versions) {
  const response = await fetch(`https://${store}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: `{ shop { name } }`
    })
  });
  console.log(`API ${version}: ${response.status}`);
}

// Also try without version
console.log('\nTrying alternate endpoint...');
const altResponse = await fetch(`https://${store}/api/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({
    query: `{ shop { name } }`
  })
});
console.log(`No version: ${altResponse.status}`);
