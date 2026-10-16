const { chromium } = require('playwright');
const fs = require('fs');

async function findCardDeck() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Search for elements containing FORME or SAUNA or DIGITAL AGENCY
  const cards = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const matches = [];

    for (const el of all) {
      const text = el.textContent || '';
      const html = el.innerHTML || '';
      const img = el.querySelector('img');
      const imgSrc = img ? img.src : '';
      if (text.includes('FORME') || text.includes('SAUNA') || text.includes('DIGITAL AGENCY') || imgSrc.includes('3heQiYtsmftq9chhJG4J6XQgXMo') || imgSrc.includes('Pcgs4wYlQjB9iJhtIfTyF5EQSA')) {
        const rect = el.getBoundingClientRect();
        matches.push({
          tag: el.tagName,
          name: el.getAttribute('data-framer-name'),
          id: el.id,
          classes: el.className,
          rect: { top: rect.top, height: rect.height, width: rect.width },
          parentName: el.parentElement ? el.parentElement.getAttribute('data-framer-name') || el.parentElement.tagName : null,
          grandParentName: el.parentElement && el.parentElement.parentElement ? el.parentElement.parentElement.getAttribute('data-framer-name') || el.parentElement.parentElement.tagName : null
        });
      }
    }
    return matches;
  });

  console.log('Found matches:', matchesCount = cards.length);
  fs.writeFileSync('inspection_data/card_deck_matches.json', JSON.stringify(cards, null, 2));

  await browser.close();
}

findCardDeck().catch(console.error);
