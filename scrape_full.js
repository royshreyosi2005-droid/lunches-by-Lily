const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
    }).on('error', reject);
  });
}

async function scrapeAll() {
  if (!fs.existsSync('scraped_data')) fs.mkdirSync('scraped_data');

  // 1. Pages JSON
  console.log('Fetching pages.json...');
  const pagesRes = await fetchUrl('https://lunchesbylily.com.au/pages.json?limit=250');
  fs.writeFileSync('scraped_data/pages.json', pagesRes.data);
  const pages = JSON.parse(pagesRes.data).pages;

  // 2. Fetch individual page HTML & JSON
  for (const page of pages) {
    console.log(`Fetching page: ${page.title} (/pages/${page.handle})`);
    const pageHtml = await fetchUrl(`https://lunchesbylily.com.au/pages/${page.handle}`);
    fs.writeFileSync(`scraped_data/page_${page.handle}.html`, pageHtml.data);
  }

  // 3. Collections JSON & HTML
  console.log('Fetching collections...');
  const collectionsRes = await fetchUrl('https://lunchesbylily.com.au/collections.json?limit=250');
  fs.writeFileSync('scraped_data/collections.json', collectionsRes.data);
  const collections = JSON.parse(collectionsRes.data).collections;
  for (const col of collections) {
    console.log(`Fetching collection: ${col.title} (/collections/${col.handle})`);
    const colHtml = await fetchUrl(`https://lunchesbylily.com.au/collections/${col.handle}`);
    fs.writeFileSync(`scraped_data/collection_${col.handle}.html`, colHtml.data);
  }

  // 4. Products JSON
  console.log('Fetching products...');
  const prodRes = await fetchUrl('https://lunchesbylily.com.au/products.json?limit=250');
  fs.writeFileSync('scraped_data/products.json', prodRes.data);

  console.log('Scraping complete!');
}

scrapeAll().catch(console.error);
