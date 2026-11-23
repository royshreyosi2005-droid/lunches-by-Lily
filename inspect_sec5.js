const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

const targetId = 'shopify-section-template--26963694092601__177924940763713a44';
const start = html.indexOf(targetId);
if (start !== -1) {
  const next = html.indexOf('shopify-section-', start + targetId.length);
  console.log('--- RAW SECTION 5 HTML ---');
  console.log(html.slice(start, next !== -1 ? next : start + 4000));
}
