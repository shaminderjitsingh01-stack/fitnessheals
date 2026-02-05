// Test original token with new scopes
const response = await fetch('https://fitnesshealssg.myshopify.com/api/2024-10/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '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',
  },
  body: JSON.stringify({
    query: `{ shop { name description } }`
  })
});

console.log('Status:', response.status);
const text = await response.text();
console.log('Response:', text);
