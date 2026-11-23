const fs = require('fs');

function findText(filename, term) {
  const html = fs.readFileSync(filename, 'utf8');
  const pos = html.toLowerCase().indexOf(term.toLowerCase());
  console.log(`Searching "${term}" in ${filename}: pos = ${pos}`);
  if (pos !== -1) {
    console.log(html.slice(Math.max(0, pos - 100), pos + 300));
  }
}

findText('scraped_data/page_about-us.html', 'Story Behind');
findText('scraped_data/page_about-us.html', 'founder');
findText('scraped_data/page_delivery-info.html', 'Delivery Days');
findText('scraped_data/page_faqs.html', 'Frequently');
findText('scraped_data/page_faqs.html', 'questions');
