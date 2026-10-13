const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  
  // Count elements before
  const beforeCount = await page.$$eval('*', els => els.length);
  
  const getInTouch = page.locator('text=Get in touch').first();
  await getInTouch.click();
  await page.waitForTimeout(1000);
  
  const afterCount = await page.$$eval('*', els => els.length);
  console.log(`DOM elements: before=${beforeCount}, after=${afterCount}`);
  
  // Look for any newly visible elements or elements with high z-index
  const modals = await page.evaluate(() => {
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const style = window.getComputedStyle(el);
      if (parseInt(style.zIndex, 10) > 10 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
        results.push({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          zIndex: style.zIndex,
          text: (el.innerText || '').slice(0, 150)
        });
      }
    }
    return results;
  });
  console.log('High z-index elements:', JSON.stringify(modals.slice(0, 5), null, 2));

  // Check form elements
  const forms = await page.$$eval('form, input, textarea', els => els.map(e => ({
    tag: e.tagName,
    type: e.type,
    name: e.name,
    placeholder: e.placeholder,
    className: e.className
  })));
  console.log('Forms and inputs:', JSON.stringify(forms, null, 2));

  await browser.close();
})();
