const { chromium } = require('playwright');
const fs = require('fs');

async function trackScrollTransforms() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Monitor elements across scroll steps
  const targetIds = [
    'hero',
    'hero-video-overlay',
    'playreel',
    'faded-text-trigger',
    'playreel-video',
    'introductions',
    'service'
  ];

  const results = [];

  for (let s = 0; s <= 3000; s += 100) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(100);

    const stepData = await page.evaluate((scrollPos) => {
      // Find all elements that have inline styles with transform or opacity or scale
      const allEls = Array.from(document.querySelectorAll('*'));
      const animated = [];

      for (const el of allEls) {
        const style = el.getAttribute('style') || '';
        const name = el.getAttribute('data-framer-name') || el.id || '';
        if (style.includes('transform') || style.includes('opacity') || style.includes('scale') || style.includes('translate')) {
          const rect = el.getBoundingClientRect();
          // only keep elements visible or near viewport
          if (rect.top < 1500 && rect.bottom > -500 && rect.width > 20 && rect.height > 20) {
            animated.push({
              name,
              tag: el.tagName,
              id: el.id,
              rect: { top: Math.round(rect.top), height: Math.round(rect.height), width: Math.round(rect.width) },
              transform: el.style.transform || window.getComputedStyle(el).transform,
              opacity: el.style.opacity || window.getComputedStyle(el).opacity,
              filter: el.style.filter || window.getComputedStyle(el).filter
            });
          }
        }
      }

      return {
        scrollY: window.scrollY,
        animatedCount: animated.length,
        animated: animated.slice(0, 20)
      };
    }, s);

    results.push(stepData);
  }

  fs.writeFileSync('inspection_data/scroll_transforms_timeline.json', JSON.stringify(results, null, 2));
  console.log('Saved inspection_data/scroll_transforms_timeline.json');

  await browser.close();
}

trackScrollTransforms().catch(console.error);
