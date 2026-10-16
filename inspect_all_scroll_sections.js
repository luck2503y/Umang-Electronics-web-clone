const { chromium } = require('playwright');
const fs = require('fs');

async function inspectAllScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // We will scroll from 0 to 8000px in steps of 400px and capture what triggers in each section
  const sectionTriggers = [];

  for (let s = 0; s <= 6000; s += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(150);

    const activeInfo = await page.evaluate((scrollPos) => {
      // Find all sections and check their visible animated elements
      const sections = Array.from(document.querySelectorAll('section, [id^="hero"], [id^="playreel"], [id^="intro"], [id^="service"], [id^="testi"], [id^="faq"], [id^="cta"]'));
      
      const details = sections.map(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          // Section is in view! Check animated child elements
          const animChildren = Array.from(sec.querySelectorAll('*')).filter(el => {
            const st = el.getAttribute('style') || '';
            return st.includes('transform') || st.includes('opacity') || st.includes('clip') || st.includes('filter');
          }).map(el => ({
            name: el.getAttribute('data-framer-name') || el.id || el.tagName,
            tag: el.tagName,
            transform: el.style.transform,
            opacity: el.style.opacity,
            style: el.getAttribute('style')
          }));

          return {
            id: sec.id,
            name: sec.getAttribute('data-framer-name'),
            rect: { top: Math.round(r.top), height: Math.round(r.height) },
            animatedChildrenCount: animChildren.length,
            animChildren: animChildren.slice(0, 10)
          };
        }
        return null;
      }).filter(Boolean);

      return {
        scrollY: scrollPos,
        visibleSections: details
      };
    }, s);

    sectionTriggers.push(activeInfo);
  }

  fs.writeFileSync('inspection_data/all_sections_scroll_report.json', JSON.stringify(sectionTriggers, null, 2));
  console.log('Saved inspection_data/all_sections_scroll_report.json');

  await browser.close();
}

inspectAllScroll().catch(console.error);
