const { chromium } = require('playwright');

async function findTVCoords() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/inspect_products.html');

  const coords = await page.evaluate(async () => {
    const img = new Image();
    img.src = 'http://localhost:3000/assets/hero_cards/smart-tv.webp';
    await new Promise(r => img.onload = r);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Find orange/sunset pixels (high red & green, low blue)
    let minX = img.width, maxX = 0, minY = img.height, maxY = 0;
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const i = (y * img.width + x) * 4;
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 180 && g > 90 && b < 80) { // bright sunset orange
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return {
      imgW: img.width,
      imgH: img.height,
      screenBox: { minX, maxX, minY, maxY },
      centerPercentX: (((minX + maxX) / 2) / img.width * 100).toFixed(1) + '%',
      centerPercentY: (((minY + maxY) / 2) / img.height * 100).toFixed(1) + '%'
    };
  });

  console.log('TV Sunset screen coordinates:', coords);
  await browser.close();
}

findTVCoords().catch(console.error);
