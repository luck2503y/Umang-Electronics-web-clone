const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const crops = [
  { name: 'smart-tv', src: 'smart-tv.webp', x: 0.05, y: 0.15, w: 0.55, h: 0.55 },
  { name: 'soundbar', src: 'soundbar.webp', x: 0.15, y: 0.2, w: 0.75, h: 0.65 },
  { name: 'air-fryer', src: 'air-fryer.webp', x: 0.2, y: 0.1, w: 0.6, h: 0.75 },
  { name: 'microwave', src: 'microwave.webp', x: 0.1, y: 0.15, w: 0.8, h: 0.7 },
  { name: 'air-purifier', src: 'air-purifier.webp', x: 0.25, y: 0.18, w: 0.5, h: 0.75 },
  { name: 'air-conditioner', src: 'air-conditioner.webp', x: 0.2, y: 0.08, w: 0.65, h: 0.55 },
  { name: 'refrigerator', src: 'refrigerator.webp', x: 0.12, y: 0.08, w: 0.65, h: 0.8 }
];

async function generatePillCrops() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/inspect_products.html');

  const outDir = path.resolve(__dirname, 'public', 'assets', 'hero_pill');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const c of crops) {
    const dataUrl = await page.evaluate(async (cfg) => {
      const img = new Image();
      img.src = 'http://localhost:3000/assets/hero_cards/' + cfg.src;
      await new Promise(r => img.onload = r);

      const targetW = 320;
      const targetH = 180;
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      const sx = img.width * cfg.x;
      const sy = img.height * cfg.y;
      const sw = img.width * cfg.w;
      const sh = sw * (targetH / targetW);

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
      return canvas.toDataURL('image/webp', 0.92);
    }, c);

    const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    const outPath = path.join(outDir, c.name + '.webp');
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    console.log(`Created custom pill crop for ${c.name} at ${outPath}`);
  }

  await browser.close();
}

generatePillCrops().catch(console.error);
