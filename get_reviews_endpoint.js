const https = require('https');

https.get('https://cdn.shopify.com/extensions/01a1f948-5e1a-7baf-be6d-234c94a331ae/judgeme-870/assets/testimonials_carousel.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Script length:', data.length);
    // search for fetch or ajax or api
    const matches = data.match(/(?:url|api|fetch|endpoint|reviews)[^,;]{1,80}/gi);
    console.log('Matches:', matches ? matches.slice(0, 30) : 'none');
  });
});
