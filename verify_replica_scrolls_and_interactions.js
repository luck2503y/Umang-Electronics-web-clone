const { chromium } = require('playwright');
const fs = require('fs');

async function testReplica() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = 'validation_results/final_verification';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('1. Testing Homepage http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${outDir}/01_homepage_hero.png` });

  // 2. Playreel Scroll
  console.log('2. Scrolling to Playreel...');
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/02_playreel.png` });

  // 3. About Section Scroll
  console.log('3. Scrolling to About / Introduction...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/03_about_revealed.png` });

  // 4. Services Section Pinned Progress
  console.log('4. Scrolling through Services...');
  // Service 1 (Landing Page)
  await page.evaluate(() => window.scrollTo(0, 3200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/04_services_tab1_landing.png` });

  // Service 2 (Marketing Site)
  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/05_services_tab2_marketing.png` });

  // Service 3 (Motion Design)
  await page.evaluate(() => window.scrollTo(0, 5200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/06_services_tab3_motion.png` });

  // 5. Testimonial Section Word Reveal
  console.log('5. Scrolling through Testimonials...');
  await page.evaluate(() => window.scrollTo(0, 6800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/07_testimonial_reveal.png` });

  // 6. Featured Templates Dial Rotation
  console.log('6. Scrolling through Featured Templates dial...');
  await page.evaluate(() => window.scrollTo(0, 8800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/08_templates_dial_1.png` });

  await page.evaluate(() => window.scrollTo(0, 10200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/09_templates_dial_2.png` });

  await page.evaluate(() => window.scrollTo(0, 11800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/10_templates_dial_3.png` });

  // 7. FAQ Accordion Interaction
  console.log('7. Scrolling to FAQ and testing accordion click...');
  await page.evaluate(() => window.scrollTo(0, 13100));
  await page.waitForTimeout(1000);
  // Click first FAQ item
  const faqBtn = await page.$('[data-framer-name="Section - FAQ"] button');
  if (faqBtn) {
    await faqBtn.click();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: `${outDir}/11_faq_opened.png` });

  // 8. CTA Section
  console.log('8. Scrolling to CTA...');
  await page.evaluate(() => window.scrollTo(0, 14200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/12_cta.png` });

  // 9. Contact Modal Trigger
  console.log('9. Testing Contact Modal...');
  const contactBtn = await page.$('button:has-text("Start a project")');
  if (contactBtn) {
    await contactBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${outDir}/13_contact_modal.png` });
    // Close modal
    const closeBtn = await page.$('button:has-text("✕")') || await page.$('button:has-text("Close")');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(400);
  }

  // 10. Products Catalog Page & Filter Tabs
  console.log('10. Testing Products Page and Filter Tabs...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/14_products_all.png` });

  // Click Framer Templates filter
  const tmplFilterBtn = await page.$('button:has-text("Framer Templates")');
  if (tmplFilterBtn) {
    await tmplFilterBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${outDir}/15_products_templates_filtered.png` });
  }

  // Click Freebies filter
  const freeFilterBtn = await page.$('button:has-text("Freebies")');
  if (freeFilterBtn) {
    await freeFilterBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${outDir}/16_products_freebies_filtered.png` });
  }

  // 11. Product Detail Page (Orionix) & Drawer
  console.log('11. Testing Orionix Detail and Info Drawer...');
  await page.goto('http://localhost:3000/products/orionix', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/17_orionix_detail.png` });

  // Click Template Info button to open drawer
  const infoBtn = await page.$('button:has-text("Template Info")');
  if (infoBtn) {
    await infoBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${outDir}/18_orionix_drawer_open.png` });
  }

  // 12. Docs Page Navigation
  console.log('12. Testing Docs Page...');
  await page.goto('http://localhost:3000/docs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/19_docs.png` });

  // 13. Responsive Mobile Viewport Test (390 x 844)
  console.log('13. Testing Mobile Responsive Viewport (390x844)...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: `${outDir}/20_mobile_hero.png` });

  await mobilePage.evaluate(() => window.scrollTo(0, 1200));
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: `${outDir}/21_mobile_services.png` });

  await mobilePage.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);
  await mobilePage.screenshot({ path: `${outDir}/22_mobile_products.png` });

  await mobilePage.close();

  console.log('Validation completed successfully!');
  console.log('Console Errors:', errors);
  await browser.close();
}

testReplica().catch(console.error);
