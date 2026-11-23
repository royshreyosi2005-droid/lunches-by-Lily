const fs = require('fs');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;

function extractNutrient(html, name) {
  // Try table format: Calories</td>...<p>565</p>
  const tableRegex = new RegExp(`${name}[\\s\\S]*?<td[^>]*>[\\s\\S]*?(?:<p>)?([0-9]+(?:\\.[0-9]+)?(?:g)?)(?:<\\/p>)?`, 'i');
  const m1 = html.match(tableRegex);
  if (m1) return m1[1];

  // Try inline format: Calories: 515 or Calories 515
  const inlineRegex = new RegExp(`${name}\\s*[:\\-]?\\s*([0-9]+(?:\\.[0-9]+)?(?:g)?)`, 'i');
  const m2 = html.match(inlineRegex);
  if (m2) return m2[1];

  return null;
}

function extractAllergens(html) {
  const m = html.match(/Allergens?\s*[:\-]?\s*(?:<[^>]+>)*\s*([^.<]+)/i);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null;
}

function extractIngredients(html) {
  const m = html.match(/Ingredients?\s*[:\-]?\s*(?:<[^>]+>)*\s*([\s\S]*?)(?=<p|<\/div|<\/td|$)/i);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;
}

prods.forEach(p => {
  const html = p.body_html || '';
  const cal = extractNutrient(html, 'Calories');
  const prot = extractNutrient(html, 'Protein');
  const fats = extractNutrient(html, 'Fats?');
  const carbs = extractNutrient(html, 'Carbohydrates?');
  const fibre = extractNutrient(html, 'Fibre');
  const allergens = extractAllergens(html);
  console.log(`- ${p.title}: Cal: ${cal}, Prot: ${prot}, Fats: ${fats}, Carbs: ${carbs}, Fibre: ${fibre} | Allergens: ${allergens ? allergens.slice(0, 30) : 'none'}`);
});
