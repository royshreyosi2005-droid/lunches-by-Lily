const fs = require('fs');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;

prods.forEach(p => {
  const html = p.body_html || '';
  
  // Allergens: usually follows "Allergens:" until a period or tag
  let allergens = '';
  const aIdx = html.indexOf('Allergens');
  if (aIdx !== -1) {
    const slice = html.slice(aIdx);
    const end = slice.indexOf('</p>');
    allergens = slice.slice(0, end !== -1 ? end : 200).replace(/<[^>]+>/g, '').replace(/Allergens?:?/i, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Ingredients: usually follows "Ingredients:" until a period or tag
  let ingredients = '';
  const iIdx = html.indexOf('Ingredients');
  if (iIdx !== -1) {
    const slice = html.slice(iIdx);
    const end = slice.indexOf('</p>');
    ingredients = slice.slice(0, end !== -1 ? end : 400).replace(/<[^>]+>/g, '').replace(/Ingredients?:?/i, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  }

  console.log(`\n=== ${p.title} ===`);
  console.log('Allergens:', allergens || 'None specified');
  console.log('Ingredients:', ingredients ? ingredients.slice(0, 120) + '...' : 'None specified');
});
