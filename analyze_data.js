const fs = require('fs');

// 1. Pages content
const pagesData = JSON.parse(fs.readFileSync('scraped_data/pages.json', 'utf8')).pages;
console.log('=== PAGES SUMMARY ===');
pagesData.forEach(p => {
  console.log(`\n--- PAGE: ${p.title} (${p.handle}) ---`);
  // strip some html tags to see text
  const cleanBody = p.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Excerpt:', cleanBody.slice(0, 300) + '...');
});

// 2. Collections & Products
const prodsData = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;
console.log('\n=== PRODUCTS COUNT ===', prodsData.length);
prodsData.forEach(p => {
  console.log(`\n--- ${p.title} ---`);
  console.log('Handle:', p.handle);
  console.log('Tags:', p.tags);
  console.log('Options:', p.options.map(o => `${o.name} (${o.values.join(', ')})`).join(' | '));
  console.log('Variants:');
  p.variants.forEach(v => {
    console.log(`   - ${v.title} | $${v.price} AUD | SKU: ${v.sku} | ID: ${v.id} | Available: ${v.available}`);
  });
  console.log('Images count:', p.images.length);
  if (p.images[0]) console.log('Main image:', p.images[0].src);
  const cleanDesc = p.body_html ? p.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  console.log('Desc excerpt:', cleanDesc.slice(0, 200) + '...');
});
