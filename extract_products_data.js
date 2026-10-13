const fs = require('fs');
const path = require('path');

const slugs = [
  'orionix',
  'fizens',
  'intelly',
  'aurea',
  'james-nolan',
  'candreva',
  'brandon-paul',
  'kokoro',
  'griddie'
];

const products = [];

for (const slug of slugs) {
  const filePath = path.join(__dirname, 'inspection_data', `page__products_${slug}.html`);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const fullTitle = titleMatch ? titleMatch[1] : slug;
  
  // Meta description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  const description = descMatch ? descMatch[1] : '';

  // Find price and category if present
  // Price $99 or Free
  const isFree = html.includes('Free Framer') || html.includes('Free') || slug === 'candreva' || slug === 'brandon-paul';
  const price = isFree ? 'Free' : '$99';

  // Category
  let category = 'Portfolio';
  if (slug === 'orionix' || slug === 'aurea') category = 'Agency';
  if (slug === 'fizens') category = 'Finance';
  if (slug === 'intelly') category = 'AI';
  if (slug === 'griddie') category = 'Portfolio';

  // Main name
  let name = slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  if (slug === 'aurea') name = 'AUREA';
  if (slug === 'orionix') name = 'Orionix';
  if (slug === 'fizens') name = 'Fizens';
  if (slug === 'intelly') name = 'Intelly';
  if (slug === 'candreva') name = 'Candreva';
  if (slug === 'brandon-paul') name = 'Brandon Paul';
  if (slug === 'james-nolan') name = 'James Nolan';
  if (slug === 'kokoro') name = 'Kokoro';
  if (slug === 'griddie') name = 'Griddie';

  // Extract images
  const imgMatches = html.match(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|webp)/g) || [];
  const uniqueImgs = Array.from(new Set(imgMatches));

  products.push({
    id: slug,
    name,
    category,
    price,
    description,
    fullTitle,
    previewUrl: `https://${slug}.framer.website/`,
    framerBuyUrl: `https://www.framer.com/templates/${slug}/`,
    images: uniqueImgs.slice(0, 8)
  });
}

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'products.json'), JSON.stringify(products, null, 2));
console.log(`Saved ${products.length} products to src/data/products.json`);
