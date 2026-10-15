const { chromium } = require('playwright');

async function debugPill() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const info = await page.evaluate(() => {
    const pill = document.querySelector('.hero-preview-pill');
    const img = pill?.querySelector('img');
    const span = pill?.querySelector('span');
    return {
      pillBox: pill?.getBoundingClientRect(),
      imgSrc: img?.src,
      imgComplete: img?.complete,
      imgNaturalW: img?.naturalWidth,
      imgNaturalH: img?.naturalHeight,
      imgStyle: img ? window.getComputedStyle(img).objectPosition : null,
      spanText: span?.innerText,
      innerHTML: pill?.innerHTML
    };
  });

  console.log('Pill info:', info);
  await browser.close();
}

debugPill().catch(console.error);
