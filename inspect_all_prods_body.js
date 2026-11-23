const fs = require('fs');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;

prods.forEach((p, idx) => {
  console.log(`\n========================================`);
  console.log(`[${idx+1}] ${p.title} (${p.handle})`);
  console.log(`Price: $${p.variants[0].price} AUD`);
  console.log(`Tags: ${p.tags.join(', ')}`);
  console.log(`Body HTML:`);
  console.log(p.body_html);
});
