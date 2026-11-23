const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

// Match sections or major containers
const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
let secIdx = 0;
let m;
while ((m = sectionRegex.exec(html)) !== null) {
  secIdx++;
  const secText = m[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`\n================== SECTION ${secIdx} ==================`);
  console.log(secText);
}
