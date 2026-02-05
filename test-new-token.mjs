// Test the new token
const token = '2bfe3728efe64241ba44524554f4087d-1770273403';

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
