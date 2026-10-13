const { chromium } = require('playwright');
const fs = require('fs');

async function inspectTopElements() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Inspect fixed elements at top
  const fixedEls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).filter(el => {
      const s = window.getComputedStyle(el);
      return s.position === 'fixed' && el.getBoundingClientRect().height > 0;
    }).map(el => ({
      tag: el.tagName,
      class: el.className,
      name: el.getAttribute('data-framer-name'),
      rect: el.getBoundingClientRect(),
      text: el.innerText ? el.innerText.trim().slice(0, 100) : '',
      bg: window.getComputedStyle(el).background
    }));
  });

  console.log('Fixed elements:', JSON.stringify(fixedEls, null, 2));

  // Inspect what header / navigation looks like
  const navEls = await page.evaluate(() => {
    const header = document.querySelector('.framer-jhnoku-container, header, [data-framer-name*="Navigation"]');
    return header ? {
      html: header.outerHTML.slice(0, 2000),
      text: header.innerText,
      rect: header.getBoundingClientRect()
    } : null;
  });
  console.log('Header element:', JSON.stringify(navEls, null, 2));

  await browser.close();
}

inspectTopElements().catch(console.error);
