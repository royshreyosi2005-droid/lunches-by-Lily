const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scraped_data/judge_reviews.json', 'utf8'));

if (data.reviews) {
  console.log('Reviews list found:', data.reviews.length);
  fs.writeFileSync('scraped_data/parsed_reviews.json', JSON.stringify(data.reviews, null, 2));
} else if (data.html) {
  const html = data.html;
  fs.writeFileSync('scraped_data/reviews_raw.html', html);
  
  // Extract items
  const itemMatches = [...html.matchAll(/<div class='jdgm-carousel-item[^']*'[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
  console.log('Items matched:', itemMatches.length);
  
  const reviews = [];
  const revRegex = /<div class='jdgm-carousel-item__review'[^>]*>([\s\S]*?)<\/div>/gi;
  const nameRegex = /<span class='jdgm-carousel-item__reviewer-name'[^>]*>([\s\S]*?)<\/span>/gi;
  const titleRegex = /<div class='jdgm-carousel-item__review-title'[^>]*>([\s\S]*?)<\/div>/gi;
  const ratingRegex = /data-score='([0-9.]+)'/gi;
  
  const revs = [...html.matchAll(revRegex)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const names = [...html.matchAll(nameRegex)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const titles = [...html.matchAll(titleRegex)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const ratings = [...html.matchAll(ratingRegex)].map(m => m[1]);

  for (let i = 0; i < revs.length; i++) {
    reviews.push({
      reviewer: names[i] || 'Customer',
      rating: ratings[i] || '5',
      title: titles[i] || '',
      body: revs[i]
    });
  }

  console.log(`Parsed ${reviews.length} reviews`);
  fs.writeFileSync('scraped_data/parsed_reviews.json', JSON.stringify(reviews, null, 2));
  reviews.forEach((r, i) => {
    console.log(`[${i+1}] ${r.reviewer} (${r.rating}★) - "${r.title}": ${r.body.slice(0, 100)}...`);
  });
}
