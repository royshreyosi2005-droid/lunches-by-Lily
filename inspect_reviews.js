const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

const start = html.indexOf('Customers are saying');
if (start !== -1) {
  console.log('--- FOUND Customers are saying ---');
  console.log(html.slice(start, start + 3000));
}

// Let's also search for judge.me reviews in html
const jdgmMatches = [...html.matchAll(/jdgm-[^"'\s>]+/g)].map(m => m[0]);
console.log('Unique jdgm classes:', [...new Set(jdgmMatches)].slice(0, 20));

// Check if there are review blocks
const reviewBlocks = [...html.matchAll(/<div class="jdgm-rev\b[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)];
console.log('Review blocks count:', reviewBlocks.length);
