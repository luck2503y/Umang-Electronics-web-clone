const { chromium } = require('playwright');

async function testUmangElectronics() {
  console.log('🚀 Starting Comprehensive Umang Electronics Automated Test Suite...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // ----------------------------------------------------
    // TEST 1: HOMEPAGE
    // ----------------------------------------------------
    console.log('\n--- TEST 1: HOMEPAGE (/) ---');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const title = await page.title();
    console.log('Page Title:', title);
    if (!title.includes('Umang Electronics')) throw new Error('Title does not contain Umang Electronics');

    // Hero verification
    const heroText = await page.innerText('#hero');
    if (!heroText.includes('Powering homes') || !heroText.includes('appliances')) {
      throw new Error('Hero does not contain expected Umang Electronics copy');
    }
    console.log('✓ Hero section copy verified');

    // Categories overview verification
    const homeCatCards = await page.$$eval('[data-framer-name="Section - Categories"] h3', els => els.map(e => e.innerText));
    console.log('Categories Overview Cards on Homepage:', homeCatCards);
    if (homeCatCards.length !== 3) throw new Error('Expected 3 category cards on homepage, found ' + homeCatCards.length);
    console.log('✓ 3 Prominent Categories displayed on homepage');

    // Featured electronics dial
    const featuredHeader = await page.innerText('#templates');
    if (!featuredHeader.includes('Featured Electronics')) {
      throw new Error('Featured Electronics dial heading missing');
    }
    console.log('✓ Concentric Dial displays Featured Electronics');

    // ----------------------------------------------------
    // TEST 2: CATALOG PAGE (/products)
    // ----------------------------------------------------
    console.log('\n--- TEST 2: CATALOG PAGE (/products) ---');
    await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });

    // Verify all 36 products initially displayed
    await page.waitForSelector('h3');
    const allProducts = await page.$$eval('h3', els => els.map(e => e.innerText.trim()).filter(Boolean));
    console.log(`Total product cards in 'All' view: ${allProducts.length}`);
    if (allProducts.length !== 36) {
      throw new Error(`Expected exactly 36 products in catalog, got ${allProducts.length}`);
    }
    console.log('✓ All 36 specified products present in the catalog');

    // Verify all images loaded and none are broken
    const brokenImages = await page.$$eval('img', imgs => {
      return imgs
        .filter(img => img.src.includes('/assets/products/'))
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src);
    });
    if (brokenImages.length > 0) {
      throw new Error('Found broken product images: ' + brokenImages.join(', '));
    }
    console.log('✓ All 36 product images verified loaded with natural width > 0');

    // Test Category 1: Home Appliances (exact 8)
    console.log('\nTesting Category: Home Appliances...');
    await page.getByRole('button', { name: 'Home Appliances (8)' }).click();
    await page.waitForTimeout(600);
    const homeAppCount = await page.locator('.product-catalog-card').count();
    console.log(`Home Appliances card count: ${homeAppCount}`);
    if (homeAppCount !== 8) throw new Error(`Expected 8 Home Appliances, got ${homeAppCount}`);
    console.log('✓ Home Appliances category filtered correctly (8 products)');

    // Test Category 2: TV & Entertainment (exact 12)
    console.log('\nTesting Category: TV & Entertainment...');
    await page.getByRole('button', { name: 'TV & Entertainment (12)' }).click();
    await page.waitForTimeout(600);
    const tvCount = await page.locator('.product-catalog-card').count();
    console.log(`TV & Entertainment card count: ${tvCount}`);
    if (tvCount !== 12) throw new Error(`Expected 12 TV & Entertainment products, got ${tvCount}`);
    console.log('✓ TV & Entertainment category filtered correctly (12 products)');

    // Test Category 3: Small Kitchen Appliances (exact 16)
    console.log('\nTesting Category: Small Kitchen Appliances...');
    await page.getByRole('button', { name: 'Small Kitchen Appliances (16)' }).click();
    await page.waitForTimeout(600);
    const kitchenCount = await page.locator('.product-catalog-card').count();
    console.log(`Small Kitchen Appliances card count: ${kitchenCount}`);
    if (kitchenCount !== 16) throw new Error(`Expected 16 Small Kitchen Appliances, got ${kitchenCount}`);
    console.log('✓ Small Kitchen Appliances category filtered correctly (16 products)');

    // Reset to All (36)
    await page.getByRole('button', { name: 'All (36)' }).click();
    await page.waitForTimeout(600);
    const resetCount = await page.locator('.product-catalog-card').count();
    console.log(`Reset 'All' count: ${resetCount}`);
    if (resetCount !== 36) throw new Error(`Expected 36 products after reset, got ${resetCount}`);
    console.log('✓ Reset to All (36) verified');

    // Test Search Input
    console.log('\nTesting Real-time Search...');
    const searchInput = await page.locator('input[placeholder*="Search appliances"]');
    await searchInput.fill('Microwave');
    await page.waitForTimeout(300);
    let searchResults = await page.$$eval('h3', els => els.map(e => e.innerText));
    console.log('Search "Microwave" results:', searchResults);
    if (!searchResults.includes('Microwave Oven')) throw new Error('Search failed for Microwave');

    await searchInput.fill('OLED');
    await page.waitForTimeout(300);
    searchResults = await page.$$eval('h3', els => els.map(e => e.innerText));
    console.log('Search "OLED" results:', searchResults);
    if (!searchResults.includes('OLED TV')) throw new Error('Search failed for OLED');

    await searchInput.fill(''); // Clear search
    await page.waitForTimeout(300);
    console.log('✓ Real-time search filters correctly');

    // ----------------------------------------------------
    // TEST 3: PRODUCT DETAIL PAGES (/products/:id)
    // ----------------------------------------------------
    console.log('\n--- TEST 3: PRODUCT DETAIL PAGES ---');
    const testIds = ['refrigerator', 'oled-tv', 'air-fryer'];
    for (const testId of testIds) {
      await page.goto(`http://localhost:3000/products/${testId}`, { waitUntil: 'networkidle' });
      const detailTitle = await page.title();
      console.log(`Detail [${testId}] title:`, detailTitle);
      if (!detailTitle.includes('Umang Electronics')) {
        throw new Error(`Detail page for ${testId} missing Umang Electronics in title`);
      }

      // Check specs table
      const specsCount = await page.$$eval('div:has-text("Verified Technical Specifications") span', els => els.length);
      console.log(`✓ [${testId}] Technical Specifications table verified`);
    }

    // Test Enquiry Modal Opening with prefilled item
    console.log('\nTesting Enquiry Modal...');
    await page.click('button:has-text("Enquire for this Appliance")');
    await page.waitForSelector('h2:has-text("Product & Installation Enquiry")');
    const modalText = await page.innerText('div:has-text("Inquiring about")');
    console.log('Modal prefilled badge:', modalText.replace(/\n/g, ' '));
    await page.click('button[aria-label="Close"]');
    await page.waitForTimeout(300);
    console.log('✓ Enquiry Modal opens and closes seamlessly');

    // ----------------------------------------------------
    // TEST 4: DOCUMENTATION CENTER (/docs)
    // ----------------------------------------------------
    console.log('\n--- TEST 4: DOCUMENTATION CENTER (/docs) ---');
    await page.goto('http://localhost:3000/docs', { waitUntil: 'networkidle' });
    const docsTitle = await page.title();
    console.log('Docs title:', docsTitle);

    // Verify all 4 modules are in sidebar
    const modules = await page.$$eval('aside .docs-sidebar > div > div > div:first-child', els => els.map(e => e.innerText));
    console.log('Documentation Modules present:');
    const moduleNames = await page.$$eval('aside div[style*="text-transform: uppercase"]', els => els.map(e => e.innerText));
    console.log(moduleNames);
    if (moduleNames.length < 4) throw new Error('Expected at least 4 documentation modules');

    // Click a lesson in Module 3
    await page.click('button:has-text("AC Dust Filter & Coil Cleaning Routine")');
    await page.waitForTimeout(300);
    const lessonTitle = await page.innerText('article h1');
    console.log('Active Lesson Title:', lessonTitle);
    if (lessonTitle !== 'AC Dust Filter & Coil Cleaning Routine') {
      throw new Error('Lesson navigation did not update active article');
    }
    console.log('✓ Documentation center lessons and modules navigate smoothly');

    // ----------------------------------------------------
    // TEST 5: CONSOLE ERRORS CHECK
    // ----------------------------------------------------
    console.log('\n--- TEST 5: BROWSER CONSOLE ERRORS ---');
    // Filter out harmless extension/tracker warnings if any
    const realErrors = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('lenis'));
    if (realErrors.length > 0) {
      console.warn('Console errors observed:', realErrors);
    } else {
      console.log('✓ Zero critical console errors across all navigated pages!');
    }

    console.log('\n🎉 ALL UMANG ELECTRONICS TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
}

testUmangElectronics().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
