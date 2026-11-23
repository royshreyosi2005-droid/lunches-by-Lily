const fs = require('fs');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;

const parsedProds = prods.map(p => {
  const html = p.body_html || '';
  
  // Extract calories, protein, carbs, fats, fibre
  const calMatch = html.match(/Calories\s*[:\-]?\s*([0-9]+)/i);
  const protMatch = html.match(/Protein\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?g?)/i);
  const fatsMatch = html.match(/Fats?\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?g?)/i);
  const carbsMatch = html.match(/Carbohydrates?\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?g?)/i);
  const fibreMatch = html.match(/Fibre\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?g?)/i);

  // Extract allergens & ingredients
  const allergensMatch = html.match(/Allergens?\s*[:\-]?\s*([^.<]+)/i);
  const ingMatch = html.match(/Ingredients?\s*[:\-]?\s*([\s\S]*?)(?=<p|<\/div|$)/i);

  // Determine category
  let category = 'Other';
  const tagsStr = p.tags.join(' ').toLowerCase();
  const titleLower = p.title.toLowerCase();
  if (tagsStr.includes('beef') || titleLower.includes('beef') || titleLower.includes('brisket') || titleLower.includes('bolognese') || titleLower.includes('ragu')) {
    category = 'Beef';
  } else if (tagsStr.includes('chicken') || titleLower.includes('chicken')) {
    category = 'Chicken';
  } else if (tagsStr.includes('lamb') || titleLower.includes('lamb')) {
    category = 'Lamb';
  } else if (tagsStr.includes('seafood') || titleLower.includes('salmon') || titleLower.includes('prawn')) {
    category = 'Seafood';
  } else if (titleLower.includes('weet-bix') || titleLower.includes('breakfast')) {
    category = 'Breakfast';
  } else if (titleLower.includes('protein balls') || titleLower.includes('snack')) {
    category = 'Snacks';
  } else if (titleLower.includes('pasta salad') || titleLower.includes('bowl')) {
    category = 'Bowls & Salads';
  }

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    tags: p.tags,
    category,
    images: p.images.map(img => img.src),
    options: p.options,
    variants: p.variants.map(v => ({
      id: v.id,
      title: v.title,
      price: parseFloat(v.price),
      sku: v.sku,
      available: v.available,
      option1: v.option1,
      option2: v.option2,
      option3: v.option3
    })),
    price: parseFloat(p.variants[0].price),
    macros: {
      calories: calMatch ? calMatch[1] : null,
      protein: protMatch ? protMatch[1] : null,
      fats: fatsMatch ? fatsMatch[1] : null,
      carbs: carbsMatch ? carbsMatch[1] : null,
      fibre: fibreMatch ? fibreMatch[1] : null
    },
    allergens: allergensMatch ? allergensMatch[1].trim() : null,
    body_html: p.body_html
  };
});

console.log('Sample parsed product:', JSON.stringify(parsedProds[0], null, 2));
console.log('Categories count:');
const counts = {};
parsedProds.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
console.log(counts);
