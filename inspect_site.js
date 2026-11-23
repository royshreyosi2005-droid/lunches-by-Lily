const fs = require('fs');

function inspectPage(filename) {
  console.log(`\n================== Inspecting ${filename} ==================`);
  const html = fs.readFileSync(filename, 'utf8');
  
  // Find all shopify sections
  const sectionMatches = [...html.matchAll(/id=["'](shopify-section-[^"']+)["']/g)].map(m => m[1]);
  console.log('Sections:', sectionMatches);

  // Extract visible text from main tag
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    let clean = mainMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log('Main text (first 600 chars):', clean.slice(0, 600));
  }
}

inspectPage('scraped_data/page_faqs.html');
inspectPage('scraped_data/page_this-weeks-set-menu.html');
inspectPage('scraped_data/page_about-us.html');
inspectPage('scraped_data/page_contact.html');
inspectPage('scraped_data/page_delivery-info.html');
inspectPage('scraped_data/collection_all.html');
inspectPage('homepage.html');
