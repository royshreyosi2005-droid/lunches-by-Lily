const https = require('https');
const fs = require('fs');

https.get('https://cdn.shopify.com/extensions/01a1f948-5e1a-7baf-be6d-234c94a331ae/judgeme-870/assets/carousels.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('carousels.js', data);
    console.log('Saved carousels.js, size:', data.length);
    // Find URL patterns
    const urls = [...data.matchAll(/https?:\/\/[^\s"'\`\)]+/g)].map(m => m[0]);
    console.log('URLs:', urls);
    const endpoints = [...data.matchAll(/(?:\/api\/|\/widgets\/)[a-zA-Z0-9_\/]+/g)].map(m => m[0]);
    console.log('Endpoints:', endpoints);
  });
});
