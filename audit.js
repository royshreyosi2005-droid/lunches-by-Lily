const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return fetchUrl(redirectUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
  });
}

async function audit() {
  console.log('--- Fetching Products ---');
  const prodRes = await fetchUrl('https://lunchesbylily.com.au/products.json?limit=250');
  try {
    const prods = JSON.parse(prodRes.data);
    fs.writeFileSync('products.json', JSON.stringify(prods, null, 2));
    console.log(`Saved ${prods.products.length} products to products.json`);
    prods.products.forEach(p => {
      console.log(`Product: "${p.title}" | Options: ${p.options.map(o=>o.name).join(', ')} | Variants: ${p.variants.length} | Images: ${p.images.length}`);
    });
  } catch(e) {
    console.error('Error parsing products.json:', e.message);
  }

  console.log('--- Fetching Collections ---');
  const colRes = await fetchUrl('https://lunchesbylily.com.au/collections.json');
  try {
    const cols = JSON.parse(colRes.data);
    fs.writeFileSync('collections.json', JSON.stringify(cols, null, 2));
    console.log(`Saved ${cols.collections.length} collections`);
    cols.collections.forEach(c => console.log(`Collection: "${c.title}" (/collections/${c.handle})`));
  } catch(e) {
    console.error('Error parsing collections.json:', e.message);
  }

  console.log('--- Fetching Homepage HTML ---');
  const homeRes = await fetchUrl('https://lunchesbylily.com.au/');
  fs.writeFileSync('homepage.html', homeRes.data);
  console.log('Saved homepage.html');
}

audit().catch(console.error);
