const fs = require('fs');

const html = fs.readFileSync('scraped_data/page_faqs.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines in faqs:', lines.length);

lines.forEach((l, i) => {
  const lower = l.toLowerCase();
  if (lower.includes('faq') || lower.includes('frequently') || lower.includes('question')) {
    console.log('Line ' + i + ': ' + l.trim().slice(0, 150));
  }
});
