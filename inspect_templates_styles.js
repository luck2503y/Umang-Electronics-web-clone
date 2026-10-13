const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to https://madebykota.com/...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle', timeout: 60000 });

  // Scroll to #templates
  const section = await page.$('#templates');
  if (!section) {
    console.error('Section #templates not found!');
    await browser.close();
    return;
  }

  const box = await section.boundingBox();
  console.log('Templates bounding box:', box);

  // Measure at scroll points: Orionix (approx 8400), Fizens (approx 9300), Intelly (approx 10200)
  const detail = await page.evaluate(async () => {
    const sec = document.querySelector('#templates');
    const sticky = sec.querySelector('[data-framer-name="Sticky"]') || sec.children[0];
    
    // Find BG, Center Pagination, Circles, Numbers, Images, Texts
    const bgs = Array.from(sec.querySelectorAll('[data-framer-name="BG"]')).map(el => {
      const img = el.querySelector('img');
      const cs = window.getComputedStyle(el);
      return {
        className: el.className,
        position: cs.position,
        inset: `${cs.top} ${cs.right} ${cs.bottom} ${cs.left}`,
        width: cs.width,
        height: cs.height,
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        filter: cs.filter,
        imgSrc: img ? img.src : null,
        imgStyle: img ? {
          objectFit: window.getComputedStyle(img).objectFit,
          width: window.getComputedStyle(img).width,
          height: window.getComputedStyle(img).height,
          opacity: window.getComputedStyle(img).opacity,
          filter: window.getComputedStyle(img).filter
        } : null
      };
    });

    const pagination = sec.querySelector('[data-framer-name="Center Pagination"]');
    const paginationCS = pagination ? window.getComputedStyle(pagination) : null;

    const circles = [1, 2, 3, 4, 5].map(n => {
      const el = sec.querySelector(`[data-framer-name="Circle-${n}"]`);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        name: `Circle-${n}`,
        width: cs.width,
        height: cs.height,
        border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
        borderRadius: cs.borderRadius,
        transform: cs.transform,
        opacity: cs.opacity,
        mask: cs.mask || cs.webkitMask
      };
    });

    const numbers = [1, 2, 3, 4, 5].map(n => {
      const el = sec.querySelector(`[data-framer-name="Number ${n}"]`);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const textChild = el.querySelector('[data-framer-component-type="RichTextContainer"]');
      const textCS = textChild ? window.getComputedStyle(textChild) : null;
      return {
        name: `Number ${n}`,
        width: cs.width,
        height: cs.height,
        borderRadius: cs.borderRadius,
        transform: cs.transform,
        opacity: cs.opacity,
        childTransform: textCS ? textCS.transform : null,
        childOpacity: textCS ? textCS.opacity : null,
        fontFamily: textCS ? textCS.fontFamily : null,
        fontSize: textCS ? textCS.fontSize : null,
        color: textCS ? textCS.color : null
      };
    });

    // Check central mockup image container
    const t1 = sec.querySelector('[data-framer-name="Template 1"]');
    const t1Main = t1 ? t1.querySelector('[data-framer-name="Main"]') : null;
    const t1Images = t1 ? Array.from(t1.querySelectorAll('img')).map(img => {
      const cs = window.getComputedStyle(img);
      const parentCS = window.getComputedStyle(img.parentElement);
      const grandParentCS = window.getComputedStyle(img.parentElement.parentElement);
      return {
        src: img.src,
        width: cs.width,
        height: cs.height,
        objectFit: cs.objectFit,
        parentBorderRadius: parentCS.borderRadius,
        parentWidth: parentCS.width,
        parentHeight: parentCS.height,
        grandParentBorderRadius: grandParentCS.borderRadius,
        grandParentWidth: grandParentCS.width,
        grandParentHeight: grandParentCS.height,
        grandParentOverflow: grandParentCS.overflow
      };
    }) : [];

    // Names and categories
    const templateNames = [1, 2, 3, 4, 5].map(n => {
      const t = sec.querySelector(`[data-framer-name="Template ${n}"]`);
      if (!t) return null;
      const nameEl = t.querySelector('[data-framer-name="Template Name"]');
      const nameCS = nameEl ? window.getComputedStyle(nameEl) : null;
      const h = nameEl ? nameEl.querySelector('p, h2, h3') : null;
      const hCS = h ? window.getComputedStyle(h) : null;
      return {
        name: n,
        text: h ? h.innerText : null,
        fontSize: hCS ? hCS.fontSize : null,
        fontFamily: hCS ? hCS.fontFamily : null,
        color: hCS ? hCS.color : null,
        letterSpacing: hCS ? hCS.letterSpacing : null,
        lineHeight: hCS ? hCS.lineHeight : null
      };
    });

    return {
      bgs,
      pagination: paginationCS ? {
        position: paginationCS.position,
        width: paginationCS.width,
        height: paginationCS.height,
        left: paginationCS.left,
        top: paginationCS.top
      } : null,
      circles,
      numbers,
      t1Images,
      templateNames
    };
  });

  fs.writeFileSync('inspection_data/templates_exact_styles.json', JSON.stringify(detail, null, 2));
  console.log('Saved templates_exact_styles.json');

  await browser.close();
})();
