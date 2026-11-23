const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

// Find all hrefs
const hrefRegex = /href=["']([^"']+)["']/g;
const links = new Set();
let match;
while ((match = hrefRegex.exec(html)) !== null) {
  const href = match[1];
  if (href.startsWith('/') || href.includes('lunchesbylily.com.au')) {
    links.add(href);
  }
}

console.log('--- All Internal Links Found (' + links.size + ') ---');
Array.from(links).sort().forEach(l => console.log(l));

// Find all headings
const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
const headings = [];
while ((match = hRegex.exec(html)) !== null) {
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (text) {
    headings.push(`${match[1].toUpperCase()}: ${text}`);
  }
}

console.log('\n--- Headings on Homepage (' + headings.length + ') ---');
headings.forEach(h => console.log(h));
