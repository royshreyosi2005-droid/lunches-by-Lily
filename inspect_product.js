const fs = require('fs');

const html = fs.readFileSync('scraped_data/prod_beef-ragu-with-mashed-sweet-potato.html', 'utf8');

// Check main content
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  // Extract text and sections
  const clean = mainMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log('Main Product Text:');
  console.log(clean.slice(0, 2000));
}

// Check details / accordions in product
const details = [...html.matchAll(/<details[^>]*>([\s\S]*?)<\/details>/gi)];
console.log('Details found in product page:', details.length);
details.forEach((d, i) => console.log(`Detail ${i}:`, d[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150)));
