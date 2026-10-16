const { chromium } = require('playwright');

async function checkHierarchy() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'domcontentloaded' });

  const info = await page.evaluate(() => {
    const mask = document.querySelector('[data-framer-name="Mask"]');
    const ssrVariant = mask.closest('.ssr-variant') || mask;
    const container = ssrVariant.parentElement;
    return {
      containerTag: container.tagName,
      containerClass: container.className,
      containerChildren: Array.from(container.children).map(c => ({
        tag: c.tagName,
        className: c.className ? c.className.slice(0, 60) : '',
        framerName: c.getAttribute('data-framer-name') || c.querySelector('[data-framer-name]')?.getAttribute('data-framer-name'),
        style: c.getAttribute('style')
      }))
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}
checkHierarchy().catch(console.error);
