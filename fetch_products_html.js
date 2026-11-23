const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

async function fetchProducts() {
  const handles = [
    'beef-ragu-with-mashed-sweet-potato',
    'slow-cooked-beef-bolognese-with-protein-spaghetti',
    'tuscan-style-chicken-potatoes',
    'new-chicken-chipotle-wrap',
    'cajun-chicken-with-sauteed-veggies-baked-potatoes',
    '3-pack-high-protein-milo-overnight-weet-bix',
    'peanut-butter-bliss-protein-balls'
  ];

  for (const h of handles) {
    console.log('Fetching product:', h);
    const data = await fetchUrl(`https://lunchesbylily.com.au/products/${h}`);
    fs.writeFileSync(`scraped_data/prod_${h}.html`, data);
  }
  console.log('Products fetched.');
}

fetchProducts();
