const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

// Find all image URLs on homepage
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
const imgs = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  const alt = m[0].match(/alt=["']([^"']*)["']/);
  imgs.push({
    src: m[1],
    alt: alt ? alt[1] : ''
  });
}
console.log('Homepage images count:', imgs.length);
imgs.slice(0, 20).forEach(img => console.log('IMG:', img.alt, '->', img.src));

// Find sections in homepage
const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
let secIdx = 0;
while ((m = sectionRegex.exec(html)) !== null) {
  secIdx++;
  const secText = m[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`\n--- SECTION ${secIdx} (${secText.length} chars) ---`);
  console.log(secText.slice(0, 300) + '...');
}
