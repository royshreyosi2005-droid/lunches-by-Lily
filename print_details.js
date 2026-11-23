const fs = require('fs');

const sections = JSON.parse(fs.readFileSync('parsed_homepage_sections.json', 'utf8'));

[0, 1, 5, 6, 7, 8, 10, 11].forEach(idx => {
  const s = sections[idx];
  console.log(`\n======================================================`);
  console.log(`SECTION [${idx}]: ${s.id}`);
  console.log('--- TEXT ---');
  console.log(s.text);
  console.log('--- IMAGES ---');
  console.log(JSON.stringify(s.images, null, 2));
});
