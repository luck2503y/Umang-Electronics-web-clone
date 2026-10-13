const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function parseSections() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  // Load services snippet inside a minimal wrapper
  const sHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${fs.readFileSync('inspection_data/services_full.html', 'utf8')}</body></html>`;
  await page.setContent(sHtml);

  const servicesInfo = await page.evaluate(() => {
    const root = document.querySelector('[data-framer-name="Section - Services"]');
    if (!root) return 'Not found';

    // find all titles, descriptions, lists, videos
    const videos = Array.from(root.querySelectorAll('video')).map(v => v.src);
    const names = Array.from(root.querySelectorAll('[data-framer-name]')).map(el => el.getAttribute('data-framer-name'));
    const texts = Array.from(root.querySelectorAll('p, h1, h2, h3, span, a, button'))
      .map(el => el.innerText.trim())
      .filter(t => t.length > 0 && t.length < 100);

    return {
      videos,
      uniqueNames: Array.from(new Set(names)),
      uniqueTexts: Array.from(new Set(texts))
    };
  });
  console.log('SERVICES INFO:', JSON.stringify(servicesInfo, null, 2));

  // Load templates snippet
  const tHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${fs.readFileSync('inspection_data/templates_full.html', 'utf8')}</body></html>`;
  await page.setContent(tHtml);

  const templatesInfo = await page.evaluate(() => {
    const root = document.querySelector('[data-framer-name="Section - Templates"]');
    if (!root) return 'Not found';

    const svgs = Array.from(root.querySelectorAll('svg')).map(s => s.outerHTML.slice(0, 300));
    const imgs = Array.from(root.querySelectorAll('img')).map(i => i.src);
    const texts = Array.from(root.querySelectorAll('p, h1, h2, h3, span, a, button'))
      .map(el => el.innerText.trim())
      .filter(t => t.length > 0 && t.length < 100);

    return {
      svgCount: svgs.length,
      imgs,
      uniqueTexts: Array.from(new Set(texts))
    };
  });
  console.log('TEMPLATES INFO:', JSON.stringify(templatesInfo, null, 2));

  await browser.close();
}

parseSections().catch(console.error);
