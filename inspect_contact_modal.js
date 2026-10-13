const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  
  const getInTouch = page.locator('text=Get in touch').first();
  await getInTouch.click();
  await page.waitForTimeout(1000);
  
  // Find modal container
  const modalText = await page.evaluate(() => {
    const form = document.querySelector('form');
    let parent = form;
    for (let i = 0; i < 5; i++) {
      if (parent && parent.parentElement) parent = parent.parentElement;
    }
    return {
      modalText: parent ? parent.innerText : form.innerText,
      modalHtml: parent ? parent.outerHTML : form.outerHTML
    };
  });
  
  fs.writeFileSync('inspection_data/contact_modal_info.json', JSON.stringify(modalText, null, 2));
  console.log('Saved contact_modal_info.json');
  console.log('Modal text:', modalText.modalText);
  await browser.close();
})();
