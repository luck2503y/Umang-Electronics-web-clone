const { chromium } = require('playwright');
const fs = require('fs');

async function inspectLoaderDOM() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // intercept or listen to DOM changes
  await page.addInitScript(() => {
    window.__loaderHTML = [];
    const observer = new MutationObserver(() => {
      const loader = document.querySelector('[data-framer-name*="Load"], [data-framer-name*="Intro"], [class*="loader"], [class*="intro"]');
      if (loader && !window.__recorded) {
        window.__recorded = true;
        window.__loaderOuter = loader.outerHTML;
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });

  await page.goto('https://madebykota.com/', { waitUntil: 'commit' });
  await page.waitForTimeout(400);

  const loaderData = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      className: el.className,
      framerName: el.getAttribute('data-framer-name'),
      text: el.innerText ? el.innerText.trim().slice(0, 100) : ''
    })).filter(x => x.text && (x.text.includes('%') || x.text.includes('KOTA') || (x.framerName && x.framerName.toLowerCase().includes('load'))));

    return {
      loaderOuter: window.__loaderOuter || null,
      matches: all,
      bodyClasses: document.body.className
    };
  });

  console.log('Loader Data:', JSON.stringify(loaderData, null, 2));

  fs.writeFileSync('inspection_data/live_loader_info.json', JSON.stringify(loaderData, null, 2));

  await browser.close();
}

inspectLoaderDOM().catch(console.error);
