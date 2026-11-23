const fs = require('fs');

const html = fs.readFileSync('scraped_data/reviews_raw.html', 'utf8');

const itemRegex = /<div class='jdgm-carousel-item\s*'[^>]*>([\s\S]*?)(?=<div class='jdgm-carousel-item\s*'|$)/gi;
const items = [...html.matchAll(itemRegex)];

const reviews = [];
items.forEach((m, idx) => {
  const content = m[1];
  const bodyMatch = content.match(/<div class='jdgm-carousel-item__review-body'>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/i);
  const nameMatch = content.match(/<div class='jdgm-carousel-item__reviewer-name[^']*'>\s*([\s\S]*?)\s*<\/div>/i);
  const timeMatch = content.match(/data-time='([^']+)'/i);
  const starsMatch = [...content.matchAll(/class='jdgm-star jdgm--on'/g)].length;

  if (bodyMatch && nameMatch) {
    reviews.push({
      reviewer: nameMatch[1].trim(),
      date: timeMatch ? timeMatch[1] : '',
      rating: starsMatch || 5,
      body: bodyMatch[1].replace(/<[^>]+>/g, '').trim()
    });
  }
});

console.log('Total extracted real reviews:', reviews.length);
fs.writeFileSync('scraped_data/real_reviews.json', JSON.stringify(reviews, null, 2));
reviews.forEach((r, i) => {
  console.log(`[${i+1}] ${r.reviewer} (${r.rating}★, ${r.date}): "${r.body}"`);
});
