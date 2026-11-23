const fs = require('fs');
const path = require('path');

const prods = JSON.parse(fs.readFileSync('scraped_data/products.json', 'utf8')).products;
const reviews = JSON.parse(fs.readFileSync('scraped_data/real_reviews.json', 'utf8'));

// Clean up reviewer names (remove html remnants)
const cleanReviews = reviews.map(r => ({
  ...r,
  reviewer: r.reviewer.replace(/<[^>]+>/g, '').trim()
}));

function extractTableMacros(html) {
  const macros = {};
  const rowMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
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
  return macros;
}

function extractAllergens(html) {
  const aIdx = html.indexOf('Allergens');
  if (aIdx !== -1) {
    const slice = html.slice(aIdx);
    const end = slice.indexOf('</p>');
    return slice.slice(0, end !== -1 ? end : 200)
      .replace(/<[^>]+>/g, '')
      .replace(/Allergens?:?/i, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return null;
}

function extractIngredients(html) {
  const iIdx = html.indexOf('Ingredients');
  if (iIdx !== -1) {
    const slice = html.slice(iIdx);
    const end = slice.indexOf('</p>');
    return slice.slice(0, end !== -1 ? end : 500)
      .replace(/<[^>]+>/g, '')
      .replace(/Ingredients?:?/i, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return null;
}

const parsedProducts = prods.map(p => {
  const html = p.body_html || '';
  const macros = extractTableMacros(html);
  const allergens = extractAllergens(html);
  const ingredients = extractIngredients(html);

  // Category & protein tag
  let proteinType = 'Other';
  const tagsStr = (p.tags || []).join(' ').toLowerCase();
  const titleLower = p.title.toLowerCase();

  if (tagsStr.includes('beef') || titleLower.includes('beef') || titleLower.includes('brisket') || titleLower.includes('bolognese') || titleLower.includes('ragu')) {
    proteinType = 'Beef';
  } else if (tagsStr.includes('chicken') || titleLower.includes('chicken')) {
    proteinType = 'Chicken';
  } else if (tagsStr.includes('lamb') || titleLower.includes('lamb')) {
    proteinType = 'Lamb';
  } else if (tagsStr.includes('seafood') || titleLower.includes('salmon') || titleLower.includes('prawn')) {
    proteinType = 'Seafood';
  } else if (titleLower.includes('weet-bix') || titleLower.includes('breakfast')) {
    proteinType = 'Breakfast';
  } else if (titleLower.includes('protein balls') || titleLower.includes('snack')) {
    proteinType = 'Snacks';
  }

  // Is on this week's drop
  // In homepage section 4, the products listed were:
  // Beef Ragu, Tuscan Style Chicken, Chicken Chipotle Wrap, Cajun Chicken, Slow-Cooked Beef Spaghetti Bolognese, High Protein Milo Overnight Weet-Bix, Peanut Butter Bliss Protein Balls
  const isThisWeek = [
    'beef-ragu-with-mashed-sweet-potato',
    'tuscan-style-chicken-potatoes',
    'new-chicken-chipotle-wrap',
    'cajun-chicken-with-sauteed-veggies-baked-potatoes',
    'slow-cooked-beef-bolognese-with-protein-spaghetti',
    '3-pack-high-protein-milo-overnight-weet-bix',
    'peanut-butter-bliss-protein-balls'
  ].includes(p.handle);

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    tags: p.tags,
    proteinType,
    isThisWeek,
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
    macros,
    allergens,
    ingredients,
    body_html: p.body_html
  };
});

if (!fs.existsSync('src')) fs.mkdirSync('src');
if (!fs.existsSync('src/data')) fs.mkdirSync('src/data');

const fileContent = `// Lunches By Lily Complete Official Site Data
// 100% Original Content, Original Pricing, Original Images, Original Policies

export const siteBrand = {
  name: "Lunches By Lily",
  tagline: "Home-cooked meal prep that doesn't taste like meal prep",
  subhead: "Macros made simple. Fresh, home-cooked meal prep delivered across Sydney. High protein, balanced meals designed for busy lifestyles.",
  announcement: "FRESH MEALS, ZERO PREP ✨ • ORDER BY THURSDAY 7PM • FREE DELIVERY ON 10+ MEALS 🚚",
  logoWhite: "https://lunchesbylily.com.au/cdn/shop/files/Lunches_By_Lily_-_Logo_Primary_-_White.png?height=36&v=1779253221",
  logoRed: "https://lunchesbylily.com.au/cdn/shop/files/Lunches_By_Lily_-_Logo_Brandmark_-_Red_27fc1aa1-8ae6-4dde-b143-5bf827f95bf0.png?crop=center&height=80&v=1771491554&width=80",
  cutOffTime: "Thursday 7:00 PM",
  deliveryDays: "Sunday & Wednesday",
  minOrderMeals: 5,
  freeDeliveryThreshold: 10,
  splitDeliveryFee: 6,
  pickupLocation: "Free Pickup at Auburn 2144",
  email: "hello@lunchesbylily.com.au",
  supportEmail: "lunchesbylily@gmail.com",
  phone: "+61457713394",
  whatsAppUrl: "https://wa.me/61457713394",
  instagramHandle: "@lunchesbylily",
  instagramUrl: "https://instagram.com/lunchesbylily",
  hours: {
    weekdays: "Monday – Friday: 9:00am – 5:00pm",
    weekends: "Saturday – Sunday: Limited availability due to meal preparation and deliveries"
  },
  gstNotice: "All prices are shown before GST — final total (including GST) will be calculated at checkout.",
  shopifyDomain: "lunchesbylily.com.au"
};

export const heroContent = {
  tagline: "Introducing",
  title: "Home-cooked meal prep that doesn't taste like meal prep",
  badges: [
    "🚚 Sunday Delivery",
    "📅 Order by Thursday night"
  ],
  bannerImage: "https://lunchesbylily.com.au/cdn/shop/files/Hero-banner-full-image.png?v=1779250252&width=3840",
  marqueeItems: [
    "🚚 Sunday Delivery",
    "Choose from our weekly rotating menu.",
    "FRESH MEALS, ZERO PREP ✨",
    "ORDER BY THURSDAY 7PM",
    "FREE DELIVERY ON 10+ MEALS 🚚"
  ]
};

export const founderStory = {
  badge: "From my kitchen to your doorstep",
  heading: "Hi, I'm Lily!",
  quote: "I started Lunches By Lily because I wanted meal prep to taste like real home-cooked food. Every meal is made with quality ingredients I'd use in my own kitchen, including premium meat, fresh produce and extra virgin olive oil. The best way I can describe it is... imagine you're coming over to my home and I'm cooking you lunch. That's the feeling I want people to have when they eat my meals.",
  ctaText: "Buy your meals",
  image: "https://lunchesbylily.com.au/cdn/shop/files/2P7A5951.jpg?height=4865&v=1780364273",
  imageAlt: "Woman holding a container of food with multiple prepared meals on a kitchen counter."
};

export const aboutPageData = {
  title: "The Story Behind Lunches by Lily",
  paragraphs: [
    "Hello, I'm Lily, the founder!",
    "Lunches By Lily didn't start in a boardroom or with a big business plan.",
    "It started while I was working full-time managing a cafe.",
    "I started cooking meals after work. And what began as a small side hustle quickly grew through word of mouth. Friends told friends, customers kept coming back and before I knew it, Lunches By Lily had become more than something I did after hours. It had completely overtaken my spare time.",
    "Eventually, I had to make one of the hardest decisions I've ever made: leaving a job I genuinely loved to back myself and pursue Lunches By Lily full-time.",
    "I've never looked back.",
    "Today, every meal is made with the same goal I had when I started: to make eating well simple. Whether you're juggling work, family, training, or just life in general, I want to take one thing off your plate so you have more time for what matters most.",
    "Lunches By Lily isn't just about meal prep. It's about giving people back their time, without compromising on fresh, nutritious food.",
    "And this is only the beginning <3"
  ]
};

export const howItWorks = {
  sectionTitle: "Meal Prep Done Differently",
  steps: [
    {
      number: "01",
      title: "Choose your meals",
      description: "Select your favourite meals in Regular or XL portions. Minimum order 5 meals with breakfast add-ons available."
    },
    {
      number: "02",
      title: "We cook fresh",
      description: "Meals are prepared in small batches with quality ingredients."
    },
    {
      number: "03",
      title: "Delivered to your door",
      description: "We deliver Sydney-wide"
    }
  ]
};

export const reviewsData = {
  title: "Customers are saying",
  averageRating: 5.00,
  reviewsCount: 79,
  verifiedText: "Verified",
  reviews: ${JSON.stringify(cleanReviews, null, 2)}
};

export const faqList = [
  {
    question: "How do I order?",
    answer: "Simply choose your meals (minimum 5), confirm your order and pay to secure your spot for that week. All meals are made fresh to order. I don't mass produce or keep stock sitting around."
  },
  {
    question: "What is the minimum order?",
    answer: "There is a minimum of 5 main meals per order. This allows me to keep everything fresh, structured and made-to-order each week."
  },
  {
    question: "When are the meals delivered?",
    answer: "We deliver across Sydney on Sunday & Wednesday depending on your meals. Delivery fees are calculated at checkout based on your location. You can also pick up from Auburn 😊 If your order is across both days, a $6 split delivery fee applies."
  },
  {
    question: "How long do the meals last?",
    answer: "Meals are made fresh and designed to last up to 7 days refrigerated (for most meals). Store them in the fridge (under 5 degrees) as soon as you receive your delivery."
  },
  {
    question: "Are your meals Halal?",
    answer: "Yes! I source Halal certified meats where applicable. If you have specific dietary requirements, please let me know when ordering."
  },
  {
    question: "Can I customise my order?",
    answer: "Because meals are prepared in batches each week, full customisation isn’t always possible, but I’ll always try to work with you where I can (e.g., swapping a carb or adjusting a portion). Just reach out before ordering!"
  },
  {
    question: "What if I need to cancel or change my order?",
    answer: "Orders can be adjusted or cancelled before the weekly cut-off time. Once ingredients are purchased and prep starts, I unfortunately can't accept cancellations or changes."
  }
];

export const deliveryZones = [
  {
    name: "Pickup at Auburn",
    fee: "FREE",
    description: "Pickup location and time window provided in your order confirmation."
  },
  {
    name: "Inner Zone",
    fee: "$15",
    description: "Includes radius up to 6-12 km from Auburn 2144."
  },
  {
    name: "Outer Zone",
    fee: "$20",
    description: "Includes radius up to 12-18 km from Auburn 2144."
  },
  {
    name: "Far Zone",
    fee: "$25",
    description: "Includes radius up to 18 km+ from Auburn 2144."
  }
];

export const proteinCategories = [
  {
    name: "Chicken",
    handle: "chicken",
    image: "https://lunchesbylily.com.au/cdn/shop/files/tuscan-chicken.png?v=1775532257&width=3840"
  },
  {
    name: "Beef",
    handle: "beef",
    image: "https://lunchesbylily.com.au/cdn/shop/collections/Beef-collection-image.png?v=1779253743&width=3840"
  },
  {
    name: "Lamb",
    handle: "lamb",
    image: "https://lunchesbylily.com.au/cdn/shop/collections/lamb-mince-bowl-spread.png?v=1779251730&width=3840"
  },
  {
    name: "Seafood",
    handle: "seafood",
    image: "https://lunchesbylily.com.au/cdn/shop/collections/Lent-garlic-prawn-bowl-spread.png?v=1779251807&width=3840"
  }
];

export const productsData = ${JSON.stringify(parsedProducts, null, 2)};
`;

fs.writeFileSync('src/data/siteData.js', fileContent, 'utf8');
console.log('Successfully written src/data/siteData.js!');
