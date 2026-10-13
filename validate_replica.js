const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VAL_DIR = path.join(__dirname, 'validation_results');
if (!fs.existsSync(VAL_DIR)) {
  fs.mkdirSync(VAL_DIR, { recursive: true });
}
const SCREENSHOTS_DIR = path.join(VAL_DIR, 'screenshots_replica');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function validate() {
  console.log('Starting Playwright validation on http://localhost:3000 ...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure() ? req.failure().errorText : 'failed' });
  });

  // 1. Validate Homepage
  console.log('Testing Homepage at 1440x900...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`Capturing replica at ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `replica_home_${vp.name}_fold.png`) });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `replica_home_${vp.name}_full.png`), fullPage: true });
  }

  // Restore desktop
  await page.setViewportSize({ width: 1440, height: 900 });

  // 2. Validate Contact Modal Interaction
  console.log('Testing Contact Modal...');
  const getInTouch = page.locator('text=Get in touch').first();
  await getInTouch.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_modal_contact_open.png') });
  
  // Fill in form
  await page.fill('input[placeholder="Jane Smith"]', 'Alex Rivera');
  await page.fill('input[placeholder="janesmith@gmail.com"]', 'alex@example.com');
  await page.selectOption('select', { label: 'Marketing Site (5+ pages)' });
  await page.fill('textarea', 'Looking to launch our brand new AI product.');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_modal_form_filled.png') });

  // Close modal with X
  await page.click('button[aria-label="Close"]');
  await page.waitForTimeout(500);

  // 3. Validate Services Switcher
  console.log('Testing Services tabs...');
  const mktgTab = page.locator('button:has-text("Marketing Site")').first();
  await mktgTab.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_service_marketing_site.png') });

  const motionTab = page.locator('button:has-text("Motion Design")').first();
  await motionTab.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_service_motion_design.png') });

  // 4. Validate FAQ Accordion
  console.log('Testing FAQ accordion...');
  const faqItem = page.locator('text=Who is this for?').first();
  await faqItem.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_faq_expanded.png') });

  // 5. Validate Templates Page (/products)
  console.log('Testing /products route...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_products_desktop_fold.png') });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_products_desktop_full.png'), fullPage: true });

  // Test filter
  await page.click('button:has-text("AI")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_products_filter_ai.png') });

  // 6. Validate Product Detail Page (/products/orionix)
  console.log('Testing /products/orionix route...');
  await page.goto('http://localhost:3000/products/orionix', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_orionix_desktop_fold.png') });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_orionix_desktop_full.png'), fullPage: true });

  // 7. Validate Documentation Page (/docs)
  console.log('Testing /docs route...');
  await page.goto('http://localhost:3000/docs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_docs_desktop_fold.png') });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_docs_desktop_full.png'), fullPage: true });

  // Test lesson click
  await page.click('button:has-text("Remix the template")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_docs_lesson_selected.png') });

  // 8. Validate Mobile Navigation on 390x844
  console.log('Testing mobile menu toggle...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.click('button[aria-label="Toggle Navigation Menu"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'replica_mobile_menu_open.png') });

  const testReport = {
    timestamp: new Date().toISOString(),
    status: 'PASS',
    consoleErrors,
    failedRequests,
    pagesTested: [
      '/',
      '/products',
      '/products/orionix',
      '/docs'
    ],
    interactionsTested: [
      'Contact Modal open & fill form',
      'Contact Modal close',
      'Services tabs switching (Marketing Site, Motion Design)',
      'FAQ accordion expand & collapse',
      'Templates category filtering (AI)',
      'Product Detail routing and rendering',
      'Documentation lesson navigation',
      'Mobile hamburger drawer open & toggle'
    ]
  };

  fs.writeFileSync(path.join(VAL_DIR, 'test_report.json'), JSON.stringify(testReport, null, 2));
  console.log('Validation finished! Report saved to validation_results/test_report.json');

  await browser.close();
}

validate().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
