const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Hero exit
  console.log('Inspecting Hero exit at y=0, 200, 400, 600...');
  const heroData = [];
  for (const y of [0, 200, 400, 600]) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(200);
    const d = await page.evaluate(sy => {
      const hero = document.querySelector('#hero, [data-framer-name*="Hero"]');
      if (!hero) return null;
      const title = hero.querySelector('h1');
      const video = hero.querySelector('video')?.parentElement;
      const sphere = hero.querySelector('canvas') || hero.querySelector('[data-framer-name*="Sphere"]');
      return {
        y: sy,
        titleTransform: title ? window.getComputedStyle(title).transform : null,
        titleOpacity: title ? window.getComputedStyle(title).opacity : null,
        videoTransform: video ? window.getComputedStyle(video).transform : null,
        sphereTransform: sphere ? window.getComputedStyle(sphere).transform : null
      };
    }, y);
    heroData.push(d);
  }
  console.log('HERO DATA:', JSON.stringify(heroData, null, 2));

  // 2. Introduction word/letter gradient
  console.log('Inspecting Introduction text gradient at y=1500, 1800, 2100...');
  const introGradient = [];
  for (const y of [1400, 1700, 2000, 2300]) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(200);
    const d = await page.evaluate(sy => {
      const intro = document.querySelector('#introductions, [data-framer-name*="Introduction"]');
      if (!intro) return null;
      const words = Array.from(intro.querySelectorAll('p > span, div > span')).filter(s => s.innerText.trim().length > 1);
      return {
        y: sy,
        firstWord: { text: words[0]?.innerText, opacity: words[0] ? window.getComputedStyle(words[0]).opacity : null },
        midWord: { text: words[Math.floor(words.length / 2)]?.innerText, opacity: words[Math.floor(words.length / 2)] ? window.getComputedStyle(words[Math.floor(words.length / 2)]).opacity : null },
        lastWord: { text: words[words.length - 1]?.innerText, opacity: words[words.length - 1] ? window.getComputedStyle(words[words.length - 1]).opacity : null }
      };
    }, y);
    introGradient.push(d);
  }
  console.log('INTRO GRADIENT:', JSON.stringify(introGradient, null, 2));

  // 3. Templates dial rotation tracking
  console.log('Inspecting Templates dial rotation across 8500 to 12500...');
  const templatesData = [];
  for (const y of [8500, 9300, 10100, 10900, 11700, 12500]) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const d = await page.evaluate(sy => {
      const tmpl = document.querySelector('#templates, [data-framer-name*="Templates"]');
      if (!tmpl) return null;
      // Find all elements with transform matrix or rotate
      const animatedEls = Array.from(tmpl.querySelectorAll('*')).filter(el => {
        const tr = window.getComputedStyle(el).transform;
        return tr && tr !== 'none' && (tr.includes('matrix') || tr.includes('rotate'));
      }).map(el => ({
        tag: el.tagName,
        className: el.className?.slice(0, 30),
        framerName: el.getAttribute('data-framer-name'),
        transform: window.getComputedStyle(el).transform
      }));
      // Also get visible template name and tags
      const title = tmpl.querySelector('h3, [data-framer-name*="Title"], [data-framer-name*="Name"]')?.innerText;
      return {
        y: sy,
        title,
        animatedEls: animatedEls.slice(0, 5)
      };
    }, y);
    templatesData.push(d);
  }
  console.log('TEMPLATES DATA:', JSON.stringify(templatesData, null, 2));

  // 4. Testimonial section word reveal tracking
  console.log('Inspecting Testimonial word reveal across 5800 to 8000...');
  const testimonialData = [];
  for (const y of [5800, 6400, 7000, 7600]) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    const d = await page.evaluate(sy => {
      const test = document.querySelector('#testimonial, [data-framer-name*="Testimonial"]');
      if (!test) return null;
      // Find words in testimonial
      const spans = Array.from(test.querySelectorAll('span')).filter(s => s.innerText.trim().length > 1);
      return {
        y: sy,
        totalSpans: spans.length,
        samples: [0, Math.floor(spans.length * 0.3), Math.floor(spans.length * 0.6), spans.length - 1].map(i => ({
          idx: i,
          word: spans[i]?.innerText?.trim()?.slice(0, 15),
          opacity: spans[i] ? window.getComputedStyle(spans[i]).opacity : null,
          filter: spans[i] ? window.getComputedStyle(spans[i]).filter : null
        }))
      };
    }, y);
    testimonialData.push(d);
  }
  console.log('TESTIMONIAL DATA:', JSON.stringify(testimonialData, null, 2));

  fs.writeFileSync('inspection_data/deep_animation_report.json', JSON.stringify({
    heroData,
    introGradient,
    templatesData,
    testimonialData
  }, null, 2));

  await browser.close();
}

main().catch(console.error);
