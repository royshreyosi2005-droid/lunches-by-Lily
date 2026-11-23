const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

const secDivs = [...html.matchAll(/id=["'](shopify-section-[^"']+)["']/g)].map(m => m[1]);

let allSections = [];

for (let i = 0; i < secDivs.length; i++) {
  const currentId = secDivs[i];
  const nextId = secDivs[i + 1];
  const start = html.indexOf(`id="${currentId}"`);
  const end = nextId ? html.indexOf(`id="${nextId}"`) : html.length;
  const chunk = html.slice(start, end);
  
  // Extract text
  const clean = chunk
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Extract images
  const imgs = [...chunk.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => {
    const alt = m[0].match(/alt=["']([^"']*)["']/);
    return { src: m[1], alt: alt ? alt[1] : '' };
  });

  allSections.push({
    id: currentId,
    text: clean,
    images: imgs
  });
}

fs.writeFileSync('parsed_homepage_sections.json', JSON.stringify(allSections, null, 2), 'utf8');
console.log('Saved parsed_homepage_sections.json');
