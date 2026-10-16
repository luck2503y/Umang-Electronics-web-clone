const { chromium } = require('playwright');
const fs = require('fs');

async function testMask() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background: #ff0055; height: 100vh; overflow: hidden;">
        <div id="hero" style="position: absolute; inset: 0; background: blue; color: white; display: flex; align-items: center; justify-content: center; font-size: 40px;">
          HERO SECTION UNDERNEATH
        </div>
        <div id="loader" style="position: fixed; inset: 0; background: black; color: white; display: flex; align-items: center; justify-content: center; z-index: 10;">
          <div style="width: 400px; height: 250px; background: orange;">LOADER CARD</div>
        </div>

        <script>
          const loader = document.getElementById('loader');
          function setMask(p) {
            const val = 'linear-gradient(0deg, rgba(0,0,0,0) ' + p + '%, rgba(0,0,0,1) ' + (p + 1) + '%)';
            loader.style.webkitMaskImage = val;
            loader.style.maskImage = val;
          }
          window.setMask = setMask;
        </script>
      </body>
    </html>
  `);

  // Test mask at 0%
  await page.evaluate(() => window.setMask(0));
  await page.screenshot({ path: 'inspection_data/test_mask_0.png' });

  // Test mask at 50%
  await page.evaluate(() => window.setMask(50));
  await page.screenshot({ path: 'inspection_data/test_mask_50.png' });

  // Test mask at 100%
  await page.evaluate(() => window.setMask(100));
  await page.screenshot({ path: 'inspection_data/test_mask_100.png' });

  console.log('Saved test mask screenshots');
  await browser.close();
}

testMask().catch(console.error);
