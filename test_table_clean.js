const fs = require('fs');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;

prods.forEach(p => {
  const html = p.body_html || '';
  // match rows
  const rowMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  const macros = {};
  rowMatches.forEach(row => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(c => 
      c[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
    );
    if (cells.length >= 2) {
      const key = cells[0].toLowerCase();
      const val = cells[1];
      if (key.includes('calor')) macros.calories = val;
      if (key.includes('protein')) macros.protein = val;
      if (key.includes('fat')) macros.fats = val;
      if (key.includes('carb')) macros.carbs = val;
      if (key.includes('fibre')) macros.fibre = val;
    }
  });

  // check if any found
  console.log(`${p.title}:`, macros);
});
