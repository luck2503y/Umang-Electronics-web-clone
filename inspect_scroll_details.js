const { chromium } = require('playwright');

async function inspectOriginalScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('\n=== PLAYREEL SCROLL ANALYSIS ===');
  for (let y = 400; y <= 1600; y += 300) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const data = await page.evaluate(() => {
      const el = document.querySelector('#playreel') || document.querySelector('[data-framer-name*="Playreel"]');
      if (!el) return 'Not found';
      // Find children with transforms or scale
      const allDivs = Array.from(el.querySelectorAll('div'));
      const animated = allDivs.filter(d => {
        const tr = window.getComputedStyle(d).transform;
        return tr && tr !== 'none';
      }).map(d => ({
        tag: d.className,
        transform: window.getComputedStyle(d).transform,
        opacity: window.getComputedStyle(d).opacity
      }));
      return { animatedCount: animated.length, samples: animated.slice(0, 3) };
    });
    console.log(`Scroll ${y}:`, JSON.stringify(data));
  }

  console.log('\n=== INTRODUCTION / ABOUT SCROLL ANALYSIS ===');
  for (let y = 1600; y <= 2700; y += 300) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const data = await page.evaluate(() => {
      const el = document.querySelector('#introductions') || document.querySelector('[data-framer-name*="Introduction"]');
      if (!el) return 'Not found';
      // Look for text reveal spans
      const spans = Array.from(el.querySelectorAll('span')).filter(s => s.innerText.trim().length > 0);
      return spans.slice(0, 4).map(s => ({
        text: s.innerText.trim(),
        opacity: window.getComputedStyle(s).opacity,
        transform: window.getComputedStyle(s).transform,
        filter: window.getComputedStyle(s).filter
      }));
    });
    console.log(`Scroll ${y}:`, JSON.stringify(data));
  }

  console.log('\n=== SERVICES SECTION SCROLL ANALYSIS ===');
  for (let y = 2900; y <= 5500; y += 600) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const data = await page.evaluate(() => {
      const el = document.querySelector('#service') || document.querySelector('[data-framer-name*="Services"]');
      if (!el) return 'Not found';
      // Find headings or service names
      const headings = Array.from(el.querySelectorAll('h2, h3, h4, p, span')).filter(h => {
        const t = h.innerText.trim();
        return t.includes('Landing') || t.includes('Marketing') || t.includes('Motion');
      }).map(h => ({
        text: h.innerText.trim().slice(0, 30),
        opacity: window.getComputedStyle(h).opacity,
        display: window.getComputedStyle(h).display
      }));
      // Check active indicator or tab
      const activeTabs = Array.from(el.querySelectorAll('[data-framer-name*="Active"], [class*="active"]')).map(t => t.innerText?.trim()?.slice(0, 30));
      return { headings: headings.slice(0, 3), activeTabs };
    });
    console.log(`Scroll ${y}:`, JSON.stringify(data));
  }

  console.log('\n=== TESTIMONIAL SECTION SCROLL ANALYSIS ===');
  for (let y = 5600; y <= 8200; y += 600) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const data = await page.evaluate(() => {
      const el = document.querySelector('#testimonial') || document.querySelector('[data-framer-name*="Testimonial"]');
      if (!el) return 'Not found';
      // Find words or spans
      const spans = Array.from(el.querySelectorAll('span')).filter(s => s.innerText.trim().length > 2);
      return {
        sampleWords: spans.slice(0, 4).map(s => ({
          word: s.innerText.trim(),
          opacity: window.getComputedStyle(s).opacity,
          filter: window.getComputedStyle(s).filter
        }))
      };
    });
    console.log(`Scroll ${y}:`, JSON.stringify(data));
  }

  console.log('\n=== TEMPLATES SECTION SCROLL ANALYSIS ===');
  for (let y = 8300; y <= 12700; y += 900) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const data = await page.evaluate(() => {
      const el = document.querySelector('#templates') || document.querySelector('[data-framer-name*="Templates"]');
      if (!el) return 'Not found';
      // Find dial rotation and current template title
      const dial = el.querySelector('[style*="rotate"], [data-framer-name*="Dial"], [data-framer-name*="Circle"]');
      const title = el.querySelector('h2, h3, [data-framer-name="Name"]');
      return {
        title: title ? title.innerText.trim() : null,
        dialTransform: dial ? window.getComputedStyle(dial).transform : null
      };
    });
    console.log(`Scroll ${y}:`, JSON.stringify(data));
  }

  await browser.close();
}

inspectOriginalScroll().catch(console.error);
