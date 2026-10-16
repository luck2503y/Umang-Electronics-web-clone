const { chromium } = require('playwright');
const fs = require('fs');

async function inspectExactAnimationCurves() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(200);

  const animDetails = await page.evaluate(() => {
    // Search in scripts or window for animation definitions
    const mask = document.querySelector('[data-framer-name="Mask"]');
    const cards = Array.from(document.querySelectorAll('[data-framer-name^="Intro-"]'));

    const cardStyles = cards.map(c => {
      const cs = window.getComputedStyle(c);
      const img = c.querySelector('img');
      const imgWrapper = c.querySelector('[data-framer-background-image-wrapper]');
      const imgWrapperCS = imgWrapper ? window.getComputedStyle(imgWrapper) : null;
      return {
        name: c.getAttribute('data-framer-name'),
        className: c.className,
        style: c.getAttribute('style'),
        width: cs.width,
        height: cs.height,
        aspectRatio: cs.aspectRatio,
        borderRadius: cs.borderRadius,
        overflow: cs.overflow,
        boxShadow: cs.boxShadow,
        border: cs.border,
        imgSrc: img ? img.src : null,
        imgWrapperBorderRadius: imgWrapperCS ? imgWrapperCS.borderRadius : null
      };
    });

    const brandEl = document.querySelector('.framer-uo8kr8');
    const counterEl = document.querySelector('.framer-1kvacm1-container');

    return {
      maskStyle: mask?.getAttribute('style'),
      maskComputed: mask ? {
        backgroundColor: window.getComputedStyle(mask).backgroundColor,
        mask: window.getComputedStyle(mask).mask || window.getComputedStyle(mask).webkitMask
      } : null,
      brand: brandEl ? {
        style: brandEl.getAttribute('style'),
        text: brandEl.innerText,
        html: brandEl.outerHTML,
        cs: {
          fontFamily: window.getComputedStyle(brandEl).fontFamily,
          fontSize: window.getComputedStyle(brandEl).fontSize,
          color: window.getComputedStyle(brandEl).color,
          left: window.getComputedStyle(brandEl).left,
          top: window.getComputedStyle(brandEl).top
        }
      } : null,
      counter: counterEl ? {
        style: counterEl.getAttribute('style'),
        text: counterEl.innerText,
        html: counterEl.outerHTML,
        cs: {
          fontFamily: window.getComputedStyle(counterEl).fontFamily,
          fontSize: window.getComputedStyle(counterEl).fontSize,
          color: window.getComputedStyle(counterEl).color,
          right: window.getComputedStyle(counterEl).right,
          top: window.getComputedStyle(counterEl).top
        }
      } : null,
      cards: cardStyles
    };
  });

  fs.writeFileSync('inspection_data/loader_animation_details.json', JSON.stringify(animDetails, null, 2));
  console.log('Saved animation details, cards count:', animDetails.cards.length);

  await browser.close();
}

inspectExactAnimationCurves().catch(console.error);
