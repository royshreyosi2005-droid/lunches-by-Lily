const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

const regex = /<div id="(shopify-section-[^"]+)"[^>]*>([\s\S]*?)<!-- \tend shopify-section \1 -->/gi;
// If the comment doesn't exist, let's find sections by `<div id="shopify-section-...`
const secDivs = [...html.matchAll(/id=["'](shopify-section-[^"']+)["']/g)].map(m => m[1]);
console.log('Shopify section IDs found:', secDivs);

// Let's print out what each section does
secDivs.forEach((id, idx) => {
  const start = html.indexOf(`id="${id}"`);
  if (start !== -1) {
    const end = html.indexOf('class="shopify-section', start + 1);
    const chunk = end !== -1 ? html.slice(start, end) : html.slice(start, start + 5000);
    const clean = chunk
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(`\n================== SECTION [${idx}] ${id} ==================`);
    console.log(clean.slice(0, 1000));
  }
});
