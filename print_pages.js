const fs = require('fs');

const pagesData = JSON.parse(fs.readFileSync('scraped_data/pages.json', 'utf8')).pages;

pagesData.forEach(p => {
  console.log(`\n========================================`);
  console.log(`PAGE: ${p.title} (handle: ${p.handle})`);
  console.log(`========================================`);
  console.log(p.body_html);
});
