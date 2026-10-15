const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateHeroBackground() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 3840, height: 2160 } });

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #000000;
          width: 3840px;
          height: 2160px;
          overflow: hidden;
          perspective: 2000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .perspective-plane {
          position: absolute;
          width: 4800px;
          height: 3200px;
          transform: rotateX(46deg) rotateZ(-18deg) translate3d(-100px, -200px, 0);
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          gap: 70px;
          justify-content: center;
          align-items: center;
        }

        .card-row {
          display: flex;
          gap: 70px;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .row-offset-1 { transform: translateX(-150px); }
        .row-offset-2 { transform: translateX(180px); }
        .row-offset-3 { transform: translateX(-200px); }

        .card {
          width: 860px;
          height: 540px;
          border-radius: 36px;
          overflow: hidden;
          position: relative;
          background: #0c0d12;
          border: 2px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }

        .card-tag {
          position: absolute;
          bottom: 24px;
          left: 28px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 12px;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.5px;
        }

        /* Cinematic vignettes & gradient overlays */
        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.15) 20%,
            rgba(0, 0, 0, 0.25) 40%,
            rgba(0, 0, 0, 0.6) 65%,
            rgba(0, 0, 0, 0.88) 82%,
            #000000 100%
          );
          pointer-events: none;
        }

        .ambient-glow {
          position: absolute;
          top: 15%;
          left: 30%;
          width: 1200px;
          height: 1200px;
          background: radial-gradient(circle, rgba(50, 90, 180, 0.18) 0%, transparent 70%);
          filter: blur(120px);
          pointer-events: none;
        }

        .ambient-glow-2 {
          position: absolute;
          bottom: 25%;
          right: 25%;
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, rgba(210, 130, 40, 0.12) 0%, transparent 70%);
          filter: blur(140px);
          pointer-events: none;
        }
      </style>
    </head>
    <body>
      <div class="ambient-glow"></div>
      <div class="ambient-glow-2"></div>

      <div class="perspective-plane">
        <!-- ROW 1 -->
        <div class="card-row row-offset-1">
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/air-conditioner.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Inverter Climate Control</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/smart-tv.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">4K OLED Ultra Cinema</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/refrigerator.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Twin Cooling Refrigerator</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/soundbar.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Dolby Atmos Soundbar</div>
          </div>
        </div>

        <!-- ROW 2 -->
        <div class="card-row row-offset-2">
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/microwave.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Smart Sensor Microwave</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/air-purifier.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">True HEPA Air Purifier</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/air-fryer.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Digital Rapid Air Fryer</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/smart-tv.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Immersive Entertainment</div>
          </div>
        </div>

        <!-- ROW 3 -->
        <div class="card-row row-offset-3">
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/refrigerator.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Precision Cooling Tech</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/soundbar.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Wireless Acoustic Sub</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/air-conditioner.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">5-Star Dual Inverter AC</div>
          </div>
          <div class="card">
            <img src="http://localhost:3000/assets/hero_cards/microwave.webp" />
            <div class="card-glass"></div>
            <div class="card-tag">Touch Screen Oven</div>
          </div>
        </div>
      </div>

      <div class="overlay-gradient"></div>
    </body>
  </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1500);

  const outPath = path.resolve(__dirname, 'public', 'assets', 'hero-electronics-bg.jpg');
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
  console.log('Saved high-res hero background to', outPath);

  await browser.close();
}

generateHeroBackground().catch(console.error);
