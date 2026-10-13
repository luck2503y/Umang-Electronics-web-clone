const { chromium } = require('playwright');

async function inspectTestimonials() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 6000));
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const section = document.querySelector('#testimonial, [data-framer-name*="Testimonial"]');
    if (!section) return null;
    const spans = Array.from(section.querySelectorAll('span, p'));
    return spans.slice(0, 20).map(s => ({
      text: s.innerText?.trim()?.slice(0, 30),
      color: window.getComputedStyle(s).color,
      opacity: window.getComputedStyle(s).opacity,
      filter: window.getComputedStyle(s).filter
    }));
  });

  console.log('ORIGINAL TESTIMONIAL STYLES:', JSON.stringify(data, null, 2));
  await browser.close();
}

inspectTestimonials().catch(console.error);
