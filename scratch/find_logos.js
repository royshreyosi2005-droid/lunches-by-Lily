const fs = require('fs');
const path = require('path');

function searchLogos() {
  const dirs = ['.', 'scraped_data'];
  const results = new Set();
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.endsWith('.html') || f.endsWith('.json') || f.endsWith('.js')) {
        const full = path.join(dir, f);
        try {
          const content = fs.readFileSync(full, 'utf8');
          const regex = /cdn\/shop\/files\/[a-zA-Z0-9_\-\.]*logo[a-zA-Z0-9_\-\.]*/gi;
          let m;
          while ((m = regex.exec(content)) !== null) {
            results.add(m[0]);
          }
        } catch (e) {}
      }
    }
  }
  
  console.log('Found logo URL patterns:', Array.from(results));
}

searchLogos();
