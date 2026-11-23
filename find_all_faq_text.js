const fs = require('fs');

const files = fs.readdirSync('scraped_data').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const html = fs.readFileSync('scraped_data/' + file, 'utf8');
  // Check for details or accordion or question classes
  const details = [...html.matchAll(/<details[^>]*>([\s\S]*?)<\/details>/gi)];
  if (details.length > 2) { // 2 are nav details
    console.log(`\n=== DETAILS IN ${file} (${details.length}) ===`);
    details.slice(2).forEach(d => console.log(d[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)));
  }

  // Check for faq schema or json-ld
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  jsonLd.forEach(j => {
    if (j[1].includes('FAQPage') || j[1].includes('Question')) {
      console.log(`\n=== JSON-LD FAQ IN ${file} ===`);
      console.log(j[1]);
    }
  });
});
