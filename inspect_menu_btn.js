const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  
  // Click menu in center
  const menuBtn = page.locator('.framer-04SIw, [data-framer-name="Menu"]').first();
  console.log('Menu count:', await menuBtn.count());
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await page.waitForTimeout(500);
    const menuHtml = await page.evaluate(() => {
      const el = document.querySelector('.framer-K2mu7, [data-framer-name*="On Dark - IN"], [data-framer-name*="Menu"]');
      return el ? el.outerHTML : 'not found';
    });
    fs.writeFileSync('inspection_data/menu_dropdown.html', menuHtml);
    await page.screenshot({ path: 'inspection_data/menu_dropdown_screenshot.png' });
    console.log('Captured menu dropdown!');
  }
  await browser.close();
})();
