const https = require('https');
const fs = require('fs');

https.get('https://cdn.shopify.com/extensions/01a1f948-5e1a-7baf-be6d-234c94a331ae/judgeme-870/assets/testimonials_carousel.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('testimonials_carousel.js', data);
    console.log('Saved testimonials_carousel.js');
  });
});
