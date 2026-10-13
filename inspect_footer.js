const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to https://madebykota.com/...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  // Take screenshot of original footer
  await page.screenshot({ path: 'inspection_data/orig_footer.png' });
  console.log('Saved inspection_data/orig_footer.png');

  // Extract footer DOM and CSS
  const footerData = await page.evaluate(() => {
    const footer = document.querySelector('footer') || document.querySelector('[data-framer-name*="Footer"]') || document.body.lastElementChild;
    if (!footer) return null;

    function getStyles(el) {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        framerName: el.getAttribute('data-framer-name'),
        id: el.id,
        text: el.innerText ? el.innerText.slice(0, 100) : null,
        display: cs.display,
        flexDirection: cs.flexDirection,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        gridTemplateColumns: cs.gridTemplateColumns,
        gap: cs.gap,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        width: cs.width,
        height: cs.height,
        background: cs.background,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        borderTop: cs.borderTop,
        borderBottom: cs.borderBottom,
        position: cs.position,
        zIndex: cs.zIndex
      };
    }

    const elements = Array.from(footer.querySelectorAll('*')).slice(0, 50).map(getStyles);

    return {
      footerOuterHTML: footer.outerHTML,
      footerStyle: getStyles(footer),
      elements
    };
  });

  if (footerData) {
    fs.writeFileSync('inspection_data/orig_footer.html', footerData.footerOuterHTML);
    fs.writeFileSync('inspection_data/orig_footer.json', JSON.stringify(footerData, null, 2));
    console.log('Saved orig_footer.html and orig_footer.json');
  } else {
    console.log('Footer element not found by standard query, dumping last sections:');
    const sections = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('section, [data-framer-name]')).slice(-5).map(el => ({
        tag: el.tagName,
        name: el.getAttribute('data-framer-name'),
        text: el.innerText.slice(0, 80)
      }));
    });
    console.log(sections);
  }

  // Also inspect what replica footer currently looks like
  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'inspection_data/replica_footer.png' });
  console.log('Saved inspection_data/replica_footer.png');

  await browser.close();
})();
