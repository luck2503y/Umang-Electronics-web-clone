const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runValidation() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const outDir = 'validation_results/new_comparison';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pageReplica = await context.newPage();
  const consoleErrors = [];
  pageReplica.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Testing Replica: http://localhost:3000/ ...');
  await pageReplica.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(2000);
  await pageReplica.screenshot({ path: `${outDir}/replica_01_home_fold.png` });

  // Playreel
  const playreel = await pageReplica.$('#playreel');
  if (playreel) {
    await playreel.scrollIntoViewIfNeeded();
    await pageReplica.waitForTimeout(1000);
    await pageReplica.screenshot({ path: `${outDir}/replica_02_playreel.png` });
  }

  // Services
  const services = await pageReplica.$('#service');
  if (services) {
    await services.scrollIntoViewIfNeeded();
    await pageReplica.waitForTimeout(1000);
    await pageReplica.screenshot({ path: `${outDir}/replica_03_services.png` });
  }

  // Testimonial
  const testimonial = await pageReplica.$('#testimonial');
  if (testimonial) {
    await testimonial.scrollIntoViewIfNeeded();
    await pageReplica.waitForTimeout(1000);
    await pageReplica.screenshot({ path: `${outDir}/replica_04_testimonial.png` });
  }

  // Templates
  const templates = await pageReplica.$('#templates');
  if (templates) {
    await templates.scrollIntoViewIfNeeded();
    await pageReplica.waitForTimeout(1000);
    await pageReplica.screenshot({ path: `${outDir}/replica_05_templates_dial.png` });
  }

  // Products Page
  console.log('Testing Products Catalog: http://localhost:3000/products ...');
  await pageReplica.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(1500);
  await pageReplica.screenshot({ path: `${outDir}/replica_06_products.png` });

  // Orionix Product Detail
  console.log('Testing Orionix Detail: http://localhost:3000/products/orionix ...');
  await pageReplica.goto('http://localhost:3000/products/orionix', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(1500);
  await pageReplica.screenshot({ path: `${outDir}/replica_07_orionix.png` });

  // Intelly Product Detail
  console.log('Testing Intelly Detail: http://localhost:3000/products/intelly ...');
  await pageReplica.goto('http://localhost:3000/products/intelly', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(1500);
  await pageReplica.screenshot({ path: `${outDir}/replica_08_intelly.png` });

  // Docs Page
  console.log('Testing Docs: http://localhost:3000/docs ...');
  await pageReplica.goto('http://localhost:3000/docs', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(1500);
  await pageReplica.screenshot({ path: `${outDir}/replica_09_docs.png` });

  console.log('Replica validation finished.');
  console.log('Console Errors:', consoleErrors);

  await browser.close();
}

runValidation().catch(console.error);
