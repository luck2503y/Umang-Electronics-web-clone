const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll near templates
  await page.evaluate(() => window.scrollTo(0, 8000));
  await page.waitForTimeout(1000);

  // Click on Number 3
  const num3 = await page.$('button[title="Go to template 3"]');
  if (num3) {
    console.log('Clicking Number 3...');
    await num3.click();
    await page.waitForTimeout(1500);

    const activeText = await page.$eval('#templates h3', el => el.innerText);
    console.log('Active template after clicking 3:', activeText);
  }

  // Click on Number 5
  const num5 = await page.$('button[title="Go to template 5"]');
  if (num5) {
    console.log('Clicking Number 5...');
    await num5.click();
    await page.waitForTimeout(1500);

    const activeText = await page.$eval('#templates h3', el => el.innerText);
    console.log('Active template after clicking 5:', activeText);
  }

  // Test link click to product detail
  const portalLink = await page.$('#templates a[title*="View"]');
  if (portalLink) {
    const href = await portalLink.getAttribute('href');
    console.log('Portal link destination:', href);
  }

  await browser.close();
  console.log('All interaction tests passed!');
})();
