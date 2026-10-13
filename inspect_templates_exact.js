const { chromium } = require('playwright');
const fs = require('fs');

async function inspectTemplatesExact() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const outDir = 'inspection_data/templates_orig_frames';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Get exact offset of templates section
  const sectionLayout = await page.evaluate(() => {
    const el = document.querySelector('#templates, [data-framer-name*="Templates"]');
    if (!el) return null;
    return {
      id: el.id,
      name: el.getAttribute('data-framer-name'),
      offsetTop: el.offsetTop,
      offsetHeight: el.offsetHeight
    };
  });
  console.log('Original Templates Layout:', sectionLayout);

  const startY = sectionLayout.offsetTop;
  const totalH = sectionLayout.offsetHeight;

  // Extract HTML structure of templates section
  const templateHTML = await page.evaluate(() => {
    const el = document.querySelector('#templates, [data-framer-name*="Templates"]');
    return el ? el.innerHTML : null;
  });
  fs.writeFileSync('inspection_data/templates_orig_structure.html', templateHTML || '');

  // Sample at 6 scroll points
  const steps = [
    startY + 50,
    startY + totalH * 0.2,
    startY + totalH * 0.4,
    startY + totalH * 0.6,
    startY + totalH * 0.8,
    startY + totalH * 0.95
  ];

  const results = [];

  for (let i = 0; i < steps.length; i++) {
    const sy = steps[i];
    await page.evaluate(y => window.scrollTo(0, y), sy);
    await page.waitForTimeout(800);

    const frameData = await page.evaluate((idx) => {
      const section = document.querySelector('#templates, [data-framer-name*="Templates"]');
      if (!section) return null;

      // Find all elements with transforms
      const allEls = Array.from(section.querySelectorAll('*'));
      const transformed = allEls.filter(el => {
        const cs = window.getComputedStyle(el);
        return cs.transform && cs.transform !== 'none';
      }).map(el => ({
        tag: el.tagName,
        className: el.className?.slice(0, 40),
        framerName: el.getAttribute('data-framer-name'),
        transform: window.getComputedStyle(el).transform,
        opacity: window.getComputedStyle(el).opacity,
        rect: {
          top: el.getBoundingClientRect().top,
          left: el.getBoundingClientRect().left,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }
      }));

      // Find visible texts: template name, price, numbers
      const texts = Array.from(section.querySelectorAll('h1, h2, h3, h4, p, span, a')).map(t => ({
        text: t.innerText?.trim(),
        framerName: t.getAttribute('data-framer-name'),
        opacity: window.getComputedStyle(t).opacity,
        color: window.getComputedStyle(t).color,
        rect: t.getBoundingClientRect()
      })).filter(t => t.text && t.text.length > 0 && t.rect.width > 0);

      // Find images / monitors
      const imgs = Array.from(section.querySelectorAll('img')).map(img => ({
        src: img.src?.slice(0, 80),
        rect: img.getBoundingClientRect(),
        transform: window.getComputedStyle(img).transform,
        opacity: window.getComputedStyle(img).opacity
      }));

      return {
        stepIndex: idx,
        scrollY: window.scrollY,
        transformedCount: transformed.length,
        transformed,
        texts: texts.slice(0, 20),
        imgs
      };
    }, i);

    results.push(frameData);
    await page.screenshot({ path: `${outDir}/orig_frame_${i + 1}.png` });
    console.log(`Captured orig_frame_${i + 1}.png at scrollY=${Math.round(sy)}`);
  }

  fs.writeFileSync('inspection_data/templates_orig_analysis.json', JSON.stringify(results, null, 2));
  console.log('Saved templates_orig_analysis.json');

  await browser.close();
}

inspectTemplatesExact().catch(console.error);
