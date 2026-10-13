const { chromium } = require('playwright');
const fs = require('fs');

async function inspectDeep() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Playreel inspection
  const playreelDetails = await page.evaluate(() => {
    const pr = document.querySelector('#playreel, [data-framer-name*="Playreel"]');
    if (!pr) return null;
    return {
      innerHTMLSnippet: pr.innerHTML.slice(0, 1000),
      text: pr.innerText,
      classes: pr.className
    };
  });
  console.log('PLAYREEL TEXT & INNER:', JSON.stringify(playreelDetails, null, 2));

  // Measure playreel elements across 200 to 1200 scroll
  const playreelFrames = [];
  for (let sy = 200; sy <= 1200; sy += 100) {
    await page.evaluate(y => window.scrollTo(0, y), sy);
    await page.waitForTimeout(100);
    const frame = await page.evaluate((sy) => {
      const pr = document.querySelector('#playreel, [data-framer-name*="Playreel"]');
      if (!pr) return null;
      // find play text, reel text, video card
      const elements = Array.from(pr.querySelectorAll('*')).filter(el => {
        const text = el.innerText?.trim();
        return text === 'PLAY' || text === 'REEL' || el.tagName === 'VIDEO';
      }).map(el => {
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          text: el.innerText?.trim(),
          transform: cs.transform,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        };
      });
      // also check the video wrapper
      const videoWrapper = pr.querySelector('video')?.parentElement;
      const vwStyle = videoWrapper ? window.getComputedStyle(videoWrapper) : null;
      return {
        scrollY: sy,
        videoWrapperTransform: vwStyle ? vwStyle.transform : null,
        videoWrapperWidth: videoWrapper ? videoWrapper.offsetWidth : null,
        videoWrapperHeight: videoWrapper ? videoWrapper.offsetHeight : null,
        elements
      };
    }, sy);
    playreelFrames.push(frame);
  }
  fs.writeFileSync('inspection_data/playreel_animation.json', JSON.stringify(playreelFrames, null, 2));
  console.log('Saved playreel_animation.json');

  // 2. Introduction inspection
  const introDetails = await page.evaluate(() => {
    const intro = document.querySelector('#introductions, [data-framer-name*="Introduction"]');
    if (!intro) return null;
    return {
      text: intro.innerText,
      childSpans: Array.from(intro.querySelectorAll('span')).map(s => s.innerText.trim()).filter(Boolean).slice(0, 30)
    };
  });
  console.log('INTRO DETAILS:', introDetails);

  // Measure introduction scroll
  const introFrames = [];
  for (let sy = 1200; sy <= 2400; sy += 150) {
    await page.evaluate(y => window.scrollTo(0, y), sy);
    await page.waitForTimeout(100);
    const frame = await page.evaluate(sy => {
      const intro = document.querySelector('#introductions, [data-framer-name*="Introduction"]');
      if (!intro) return null;
      const letters = Array.from(intro.querySelectorAll('span')).filter(s => s.children.length === 0 && s.innerText.trim().length === 1);
      return {
        scrollY: sy,
        sampleLetters: letters.slice(0, 10).map(l => ({
          char: l.innerText,
          opacity: window.getComputedStyle(l).opacity,
          color: window.getComputedStyle(l).color
        }))
      };
    }, sy);
    introFrames.push(frame);
  }
  fs.writeFileSync('inspection_data/intro_animation.json', JSON.stringify(introFrames, null, 2));
  console.log('Saved intro_animation.json');

  // 3. Templates dial inspection
  // Let's find exactly what element rotates in templates
  const templateEls = await page.evaluate(() => {
    const tmpl = document.querySelector('#templates, [data-framer-name*="Templates"]');
    if (!tmpl) return null;
    const all = Array.from(tmpl.querySelectorAll('*'));
    return all.map(el => ({
      framerName: el.getAttribute('data-framer-name'),
      tag: el.tagName,
      className: el.className,
      style: el.getAttribute('style')
    })).filter(x => x.framerName || (x.style && x.style.includes('rotate')));
  });
  console.log('TEMPLATES FRAMER ELEMENTS COUNT:', templateEls.length);
  fs.writeFileSync('inspection_data/templates_framer_elements.json', JSON.stringify(templateEls.slice(0, 40), null, 2));

  await browser.close();
}

inspectDeep().catch(console.error);
