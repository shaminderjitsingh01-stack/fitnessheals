// Raw fetch test for more error details
const response = await fetch('https://fitnesshealssg.myshopify.com/api/2024-10/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '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',
  },
  body: JSON.stringify({
    query: `{ shop { name } }`
  })
});

console.log('Status:', response.status);
console.log('Status Text:', response.statusText);
console.log('Headers:', Object.fromEntries(response.headers.entries()));

const text = await response.text();
console.log('\nResponse Body:');
console.log(text);
