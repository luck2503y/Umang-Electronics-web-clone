const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function deepInspect() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Loading https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 1. Detect Libraries and WebGL / Canvas / Lenis
  const techAudit = await page.evaluate(() => {
    const hasCanvas = document.querySelectorAll('canvas').length;
    const canvasDetails = Array.from(document.querySelectorAll('canvas')).map(c => {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return {
        width: c.width,
        height: c.height,
        isWebGL: !!gl,
        classes: c.className,
        parent: c.parentElement ? c.parentElement.className : ''
      };
    });

    const isLenis = !!window.Lenis || document.documentElement.classList.contains('lenis');
    
    // Check custom cursor
    const cursorEls = document.querySelectorAll('[class*="cursor"], .framer-lib-cursors-host');
    
    // Check scroll height
    const scrollHeight = document.documentElement.scrollHeight;

    // Check all script tags and imported modules
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean);

    return {
      hasCanvas,
      canvasDetails,
      isLenis,
      cursorCount: cursorEls.length,
      scrollHeight,
      scripts: scripts.slice(0, 20)
    };
  });

  console.log('Tech Audit:', JSON.stringify(techAudit, null, 2));
  fs.writeFileSync('inspection_data/tech_audit.json', JSON.stringify(techAudit, null, 2));

  // 2. Scroll through page and capture sections at different scroll offsets
  const scrollSteps = [0, 800, 1600, 2400, 3200, 4200, 5500, 7000, 9000, 11000];
  for (const y of scrollSteps) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `inspection_data/scroll_${y}px.png` });
    console.log(`Captured scroll at ${y}px`);
  }

  // 3. Inspect exact styles of all sections on the live page
  const sectionsData = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('[data-framer-name]')).filter(el => {
      const name = el.getAttribute('data-framer-name');
      return name && name.startsWith('Section');
    });

    return sections.map(s => {
      const rect = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      return {
        name: s.getAttribute('data-framer-name'),
        id: s.id,
        height: style.height,
        backgroundColor: style.backgroundColor,
        padding: style.padding,
        display: style.display,
        position: style.position,
        classes: s.className,
        outerHTMLSnippet: s.outerHTML.slice(0, 600)
      };
    });
  });

  fs.writeFileSync('inspection_data/sections_exact_audit.json', JSON.stringify(sectionsData, null, 2));
  console.log('Sections Exact Audit:', sectionsData.map(s => s.name));

  await browser.close();
}

deepInspect().catch(console.error);
