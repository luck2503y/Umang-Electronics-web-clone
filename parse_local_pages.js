const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function parse() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const homePath = 'file:///' + path.resolve(__dirname, 'inspection_data', 'homepage.html').replace(/\\/g, '/');
  await page.goto(homePath);

  // Extract sections by data-framer-name
  const sections = await page.evaluate(() => {
    const list = [];
    const elements = document.querySelectorAll('[data-framer-name]');
    for (const el of elements) {
      const name = el.getAttribute('data-framer-name');
      // If it looks like a section or main component
      if (name && (name.startsWith('Section') || name.startsWith('Hero') || name.startsWith('Header') || name.startsWith('Footer') || name.startsWith('Nav') || name.startsWith('Card') || name.startsWith('Template') || name.startsWith('Service') || name.startsWith('About') || name.startsWith('FAQ') || name.startsWith('Review') || name.startsWith('CTA'))) {
        list.push({
          name,
          tag: el.tagName,
          classes: el.className,
          text: el.innerText.trim().slice(0, 300)
        });
      }
    }
    return list;
  });

  fs.writeFileSync('inspection_data/homepage_sections.json', JSON.stringify(sections, null, 2));
  console.log(`Extracted ${sections.length} named sections/components on homepage`);

  // Extract text nodes hierarchy
  const allTexts = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p')).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
      className: h.className,
      style: {
        fontSize: window.getComputedStyle(h).fontSize,
        fontWeight: window.getComputedStyle(h).fontWeight,
        color: window.getComputedStyle(h).color,
        fontFamily: window.getComputedStyle(h).fontFamily,
        lineHeight: window.getComputedStyle(h).lineHeight,
        letterSpacing: window.getComputedStyle(h).letterSpacing
      }
    })).filter(h => h.text.length > 0);
    return headings;
  });

  fs.writeFileSync('inspection_data/homepage_typography.json', JSON.stringify(allTexts, null, 2));
  console.log(`Extracted ${allTexts.length} text elements with computed typography`);

  // Parse products page
  const prodPath = 'file:///' + path.resolve(__dirname, 'inspection_data', 'page__products.html').replace(/\\/g, '/');
  await page.goto(prodPath);
  const prodTexts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a')).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
      href: h.getAttribute('href')
    })).filter(h => h.text.length > 0);
  });
  fs.writeFileSync('inspection_data/products_texts.json', JSON.stringify(prodTexts, null, 2));
  console.log(`Extracted ${prodTexts.length} elements on products page`);

  // Parse docs page
  const docsPath = 'file:///' + path.resolve(__dirname, 'inspection_data', 'page__docs.html').replace(/\\/g, '/');
  await page.goto(docsPath);
  const docsContent = await page.evaluate(() => {
    return document.body.innerText;
  });
  fs.writeFileSync('inspection_data/docs_text.txt', docsContent);
  console.log('Docs length:', docsContent.length);

  await browser.close();
}

parse().catch(console.error);
