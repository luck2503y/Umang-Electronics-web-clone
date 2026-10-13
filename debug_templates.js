const { chromium } = require('playwright');

async function debugTemplates() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/');
  await page.evaluate(() => window.scrollTo(0, 9500));
  await page.waitForTimeout(600);
  const data = await page.evaluate(() => {
    const s = document.querySelector('#templates');
    const sticky = s ? s.querySelector('div') : null;
    const grid = sticky ? sticky.querySelector('div') : null;
    return {
      windowHeight: window.innerHeight,
      scrollY: window.scrollY,
      sectionTop: s ? s.offsetTop : null,
      stickyTop: sticky ? sticky.getBoundingClientRect().top : null,
      stickyHeight: sticky ? sticky.offsetHeight : null,
      gridRect: grid ? grid.getBoundingClientRect() : null
    };
  });
  console.log('DEBUG TEMPLATES DATA:', JSON.stringify(data, null, 2));
  await page.screenshot({ path: 'validation_results/final_verification/debug_templates_9500.png' });
  await browser.close();
}

debugTemplates().catch(console.error);
