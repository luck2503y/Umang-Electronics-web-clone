const { chromium } = require('playwright');
const fs = require('fs');

async function compare() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const pageOrig = await context.newPage();
  const pageReplica = await context.newPage();

  console.log('Navigating to original and replica...');
  await pageOrig.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await pageReplica.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await pageOrig.waitForTimeout(2000);
  await pageReplica.waitForTimeout(2000);

  // Take fold screenshots
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_home_fold.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_home_fold.png' });

  // Scroll to 900px (Playreel)
  await pageOrig.evaluate(() => window.scrollTo(0, 900));
  await pageReplica.evaluate(() => window.scrollTo(0, 900));
  await pageOrig.waitForTimeout(1000);
  await pageReplica.waitForTimeout(1000);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_playreel.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_playreel.png' });

  // Scroll to 1800px (Introduction / About)
  await pageOrig.evaluate(() => window.scrollTo(0, 1800));
  await pageReplica.evaluate(() => window.scrollTo(0, 1800));
  await pageOrig.waitForTimeout(1000);
  await pageReplica.waitForTimeout(1000);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_about.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_about.png' });

  // Scroll to 3000px (Services)
  await pageOrig.evaluate(() => window.scrollTo(0, 3000));
  await pageReplica.evaluate(() => window.scrollTo(0, 3000));
  await pageOrig.waitForTimeout(1000);
  await pageReplica.waitForTimeout(1000);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_services.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_services.png' });

  // Scroll to 6000px (Testimonial)
  await pageOrig.evaluate(() => window.scrollTo(0, 6000));
  await pageReplica.evaluate(() => window.scrollTo(0, 6000));
  await pageOrig.waitForTimeout(1000);
  await pageReplica.waitForTimeout(1000);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_testimonial.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_testimonial.png' });

  // Scroll to 9000px (Templates)
  await pageOrig.evaluate(() => window.scrollTo(0, 9000));
  await pageReplica.evaluate(() => window.scrollTo(0, 9000));
  await pageOrig.waitForTimeout(1000);
  await pageReplica.waitForTimeout(1000);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_templates.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_templates.png' });

  // Products page
  await pageOrig.goto('https://madebykota.com/products', { waitUntil: 'networkidle' });
  await pageReplica.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await pageOrig.waitForTimeout(1500);
  await pageReplica.waitForTimeout(1500);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_products.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_products.png' });

  // Orionix page
  await pageOrig.goto('https://madebykota.com/products/orionix', { waitUntil: 'networkidle' });
  await pageReplica.goto('http://localhost:3000/products/orionix', { waitUntil: 'networkidle' });
  await pageOrig.waitForTimeout(1500);
  await pageReplica.waitForTimeout(1500);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_orionix.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_orionix.png' });

  // Docs page
  await pageOrig.goto('https://madebykota.com/docs', { waitUntil: 'networkidle' });
  await pageReplica.goto('http://localhost:3000/docs', { waitUntil: 'networkidle' });
  await pageOrig.waitForTimeout(1500);
  await pageReplica.waitForTimeout(1500);
  await pageOrig.screenshot({ path: 'inspection_data/compare_orig_docs.png' });
  await pageReplica.screenshot({ path: 'inspection_data/compare_replica_docs.png' });

  console.log('All side-by-side screenshots captured.');
  await browser.close();
}

compare().catch(console.error);
