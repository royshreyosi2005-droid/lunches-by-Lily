const fs = require('fs');

const sections = JSON.parse(fs.readFileSync('parsed_homepage_sections.json', 'utf8'));

sections.forEach((s, i) => {
  console.log(`\n======================================================`);
  console.log(`SECTION [${i}]: ${s.id}`);
  console.log(`Images: ${s.images.length}`);
  s.images.forEach(img => console.log(`   Image: ${img.alt || '(no alt)'} -> ${img.src.slice(0, 80)}...`));
  console.log(`Text excerpt:`);
  console.log(s.text.slice(0, 400));
  if (s.text.length > 400) console.log(`... [${s.text.length} chars total]`);
});
