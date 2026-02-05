// Test Headless channel token
const token = '387c811c322af51ac081e4c73c71db94';

const response = await fetch('https://fitnesshealssg.myshopify.com/api/2024-10/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({
    query: `{ shop { name description } }`
  })
});

console.log('Status:', response.status);
const text = await response.text();
console.log('Response:', text);
