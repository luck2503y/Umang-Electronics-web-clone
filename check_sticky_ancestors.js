const { chromium } = require('playwright');

async function checkStickyAncestors() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  const report = await page.evaluate(() => {
    const el = document.querySelector('#templates');
    const stickyEl = el ? el.querySelector('div') : null;
    if (!stickyEl) return 'no stickyEl';

    let cur = stickyEl.parentElement;
    const chain = [];
    while (cur) {
      const cs = window.getComputedStyle(cur);
      chain.push({
        tag: cur.tagName,
        id: cur.id,
        className: cur.className,
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        transform: cs.transform,
        filter: cs.filter,
        position: cs.position,
        height: cs.height
      });
      cur = cur.parentElement;
    }
    const stickyCS = window.getComputedStyle(stickyEl);
    return {
      stickyElement: {
        position: stickyCS.position,
        top: stickyCS.top,
        height: stickyCS.height,
        transform: stickyCS.transform
      },
      ancestors: chain
    };
  });

  console.log('STICKY ANCESTOR REPORT:', JSON.stringify(report, null, 2));
  await browser.close();
}

checkStickyAncestors().catch(console.error);
