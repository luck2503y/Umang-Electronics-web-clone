const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const userImages = [
  { name: 'smart-tv', file: 'Gemini_Generated_Image_4m769m4m769m4m76 (1).png', title: 'Smart 4K TV' },
  { name: 'soundbar', file: 'Gemini_Generated_Image_4m769m4m769m4m76 (2).png', title: 'Hi-Fi Soundbar' },
  { name: 'air-fryer', file: 'Gemini_Generated_Image_4m769m4m769m4m76 (3).png', title: 'Digital Air Fryer' },
  { name: 'microwave', file: 'Gemini_Generated_Image_4m769m4m769m4m76 (4).png', title: 'Microwave Oven' },
  { name: 'air-purifier', file: 'Gemini_Generated_Image_4m769m4m769m4m76 (5).png', title: 'Air Purifier' },
  { name: 'air-conditioner', file: 'Gemini_Generated_Image_4m769m4m769m4m76.png', title: 'Inverter AC' },
  { name: 'refrigerator', file: 'Gemini_Generated_Image_fz37uxfz37uxfz37.png', title: 'Smart Refrigerator' }
];

async function optimizeImages() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const outDir = path.resolve(__dirname, 'public', 'assets', 'hero_cards');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const productsDir = path.resolve(__dirname, 'public', 'assets', 'products');

  await page.goto('http://localhost:3000/inspect_products.html');

  for (const item of userImages) {
    const srcPath = `http://localhost:3000/assets/user_images/${encodeURIComponent(item.file)}`;
    console.log(`Processing ${item.name} from ${srcPath} ...`);

    const result = await page.evaluate(async (url) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = () => rej(new Error('Failed to load: ' + url));
      });

      const canvas = document.createElement('canvas');
      const maxW = 1600;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/webp', 0.90);
      return dataUrl;
    }, srcPath);

    const base64Data = result.replace(/^data:image\/webp;base64,/, '');
    const outPath = path.join(outDir, `${item.name}.webp`);
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

    // Also update public/assets/products
    if (item.name === 'smart-tv') {
      fs.writeFileSync(path.join(productsDir, 'smart-tv.jpg'), Buffer.from(base64Data, 'base64'));
      fs.writeFileSync(path.join(productsDir, 'oled-tv.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'refrigerator') {
      fs.writeFileSync(path.join(productsDir, 'refrigerator.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'air-conditioner') {
      fs.writeFileSync(path.join(productsDir, 'air-conditioner.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'air-fryer') {
      fs.writeFileSync(path.join(productsDir, 'air-fryer.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'microwave') {
      fs.writeFileSync(path.join(productsDir, 'microwave-oven.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'soundbar') {
      fs.writeFileSync(path.join(productsDir, 'soundbar.jpg'), Buffer.from(base64Data, 'base64'));
      fs.writeFileSync(path.join(productsDir, 'home-theatre-system.jpg'), Buffer.from(base64Data, 'base64'));
    } else if (item.name === 'air-purifier') {
      fs.writeFileSync(path.join(productsDir, 'air-cooler.jpg'), Buffer.from(base64Data, 'base64'));
      fs.writeFileSync(path.join(productsDir, 'water-purifier.jpg'), Buffer.from(base64Data, 'base64'));
    }
  }

  await browser.close();
  console.log('Done optimizing and updating products assets!');
}

optimizeImages().catch(console.error);
