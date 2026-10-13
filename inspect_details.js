const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, 'inspection_data');
const SCREENSHOTS_DIR = path.join(ARTIFACTS_DIR, 'screenshots_orig');

async function inspectDetails() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Inspect "Get in touch" / "Start a project" click
  console.log('Testing "Get in touch" click...');
  const getInTouchBtn = page.locator('text="Get in touch"').first();
  if (await getInTouchBtn.isVisible()) {
    await getInTouchBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'orig_modal_get_in_touch.png') });
    const modalHtml = await page.content();
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'after_click_get_in_touch.html'), modalHtml);
    console.log('Captured get in touch modal/dialog state');
  }

  // 2. Inspect mobile navigation drawer/menu
  console.log('Testing mobile menu toggle...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Find hamburger icon / button
  const menuButtons = await page.$$('header button, nav button, [aria-label*="menu" i], [aria-label*="navigation" i]');
  console.log('Found mobile buttons:', menuButtons.length);
  // Also look for svg or clickable elements in the header
  const headerLinks = await page.$$('header a, nav a, [data-framer-name*="Navigation"] div, [data-framer-name*="Nav"] div');
  console.log('Header elements:', headerLinks.length);
  
  // Let's take screenshot of mobile top
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'orig_mobile_nav_closed.png') });

  // Let's check for hamburger element specifically
  const hamburger = page.locator('.framer-y203a, button, [role="button"]').first();
  try {
    // Try clicking the top right icon on mobile
    await page.mouse.click(350, 40); // top right where hamburger usually is
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'orig_mobile_nav_after_click.png') });
  } catch (e) {
    console.log('Mobile click error:', e.message);
  }

  // Restore desktop
  await page.setViewportSize({ width: 1440, height: 900 });

  // 3. Inspect FAQ accordion interactions
  console.log('Inspecting FAQ accordions...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Find FAQ elements
  const faqTitles = await page.$$eval('[data-framer-name*="FAQ"], [data-framer-name*="Accordion"], [data-framer-name*="Question"]', els => els.map(e => ({
    name: e.getAttribute('data-framer-name'),
    text: e.innerText
  })));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'faq_elements.json'), JSON.stringify(faqTitles, null, 2));

  // 4. Test remaining routes in sitemap: /docs, /products/orionix, /products/fizens, etc.
  const extraRoutes = [
    'https://madebykota.com/docs',
    'https://madebykota.com/products/orionix',
    'https://madebykota.com/products/fizens',
    'https://madebykota.com/products/candreva',
    'https://madebykota.com/products/brandon-paul',
    'https://madebykota.com/products/kokoro',
    'https://madebykota.com/products/griddie'
  ];

  for (const r of extraRoutes) {
    try {
      console.log(`Inspecting extra route: ${r}`);
      const slug = new URL(r).pathname.replace(/[^a-zA-Z0-9_-]/g, '_');
      const p = await context.newPage();
      const res = await p.goto(r, { waitUntil: 'networkidle', timeout: 30000 });
      console.log(`Status for ${r}:`, res.status());
      await p.waitForTimeout(1500);
      const content = await p.content();
      fs.writeFileSync(path.join(ARTIFACTS_DIR, `page_${slug}.html`), content);
      await p.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_${slug}_fold.png`) });
      await p.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_${slug}_full.png`), fullPage: true });
      await p.close();
    } catch (err) {
      console.log(`Failed on ${r}:`, err.message);
    }
  }

  await browser.close();
  console.log('Done detail inspection!');
}

inspectDetails().catch(console.error);
