const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, 'inspection_data');
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}
const SCREENSHOTS_DIR = path.join(ARTIFACTS_DIR, 'screenshots_orig');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function inspect() {
  console.log('Starting inspection of https://madebykota.com/...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  
  // Track network requests and console
  const networkRequests = [];
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('request', req => {
    networkRequests.push({ url: req.url(), resourceType: req.resourceType() });
  });

  console.log('Navigating to homepage...');
  const response = await page.goto('https://madebykota.com/', { waitUntil: 'networkidle', timeout: 60000 });
  console.log('Homepage status:', response.status());

  // Wait a bit for initial animations
  await page.waitForTimeout(3000);

  // Capture title and metadata
  const title = await page.title();
  const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  console.log('Title:', title);
  console.log('Description:', metaDesc);

  // Extract all links
  const links = await page.$$eval('a', anchors => anchors.map(a => ({
    href: a.href,
    text: a.innerText.trim(),
    target: a.target,
    className: a.className
  })));
  console.log('Total links found:', links.length);
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'links.json'), JSON.stringify(links, null, 2));

  // Extract internal routes
  const internalUrls = new Set();
  internalUrls.add('https://madebykota.com/');
  for (const l of links) {
    if (l.href.startsWith('https://madebykota.com') || l.href.startsWith('/')) {
      const full = new URL(l.href, 'https://madebykota.com').href;
      // remove hashes for unique pages
      const noHash = full.split('#')[0];
      if (noHash.startsWith('https://madebykota.com')) {
        internalUrls.add(noHash);
      }
    }
  }
  console.log('Internal routes discovered:', Array.from(internalUrls));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'routes.json'), JSON.stringify(Array.from(internalUrls), null, 2));

  // Extract all fonts and stylesheets
  const styles = await page.$$eval('style, link[rel="stylesheet"]', els => els.map(el => {
    if (el.tagName.toLowerCase() === 'link') return { type: 'link', href: el.href };
    return { type: 'style', text: el.innerHTML.slice(0, 1000) };
  }));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'styles_summary.json'), JSON.stringify(styles, null, 2));

  // Save the full HTML of the homepage
  const html = await page.content();
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'homepage.html'), html, 'utf8');

  // Viewports to test
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`Setting viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(2000);
    // Screenshot above fold
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_home_${vp.name}_fold.png`) });
    // Full page screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_home_${vp.name}_full.png`), fullPage: true });
  }

  // Restore desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  // Test other discovered routes
  for (const route of Array.from(internalUrls)) {
    if (route === 'https://madebykota.com/' || route === 'https://madebykota.com') continue;
    console.log(`Inspecting sub-route: ${route}`);
    try {
      const subPage = await context.newPage();
      await subPage.goto(route, { waitUntil: 'networkidle', timeout: 30000 });
      await subPage.waitForTimeout(2000);
      const urlSlug = new URL(route).pathname.replace(/[^a-zA-Z0-9_-]/g, '_');
      const subHtml = await subPage.content();
      fs.writeFileSync(path.join(ARTIFACTS_DIR, `page_${urlSlug}.html`), subHtml, 'utf8');
      await subPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_${urlSlug}_desktop_fold.png`) });
      await subPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `orig_${urlSlug}_desktop_full.png`), fullPage: true });
      await subPage.close();
    } catch (err) {
      console.error(`Error loading route ${route}:`, err.message);
    }
  }

  // Inspect interactive states on homepage
  console.log('Inspecting interactive components on homepage...');
  // Inspect buttons, navigation, modals, hamburger
  const buttonInfo = await page.$$eval('button, a[role="button"], [role="button"]', btns => btns.map(b => ({
    text: b.innerText.trim(),
    tag: b.tagName,
    classes: b.className,
    ariaLabel: b.getAttribute('aria-label')
  })));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'buttons.json'), JSON.stringify(buttonInfo, null, 2));

  // Check sitemap.xml
  try {
    const sitemapPage = await context.newPage();
    const smRes = await sitemapPage.goto('https://madebykota.com/sitemap.xml');
    if (smRes.ok()) {
      const smText = await sitemapPage.content();
      fs.writeFileSync(path.join(ARTIFACTS_DIR, 'sitemap.xml'), smText, 'utf8');
      console.log('Saved sitemap.xml');
    }
    await sitemapPage.close();
  } catch (e) {
    console.log('No sitemap.xml found or error:', e.message);
  }

  // Inspect media assets (images, videos)
  const mediaAssets = await page.$$eval('img, video, svg', elements => elements.map(el => {
    return {
      tag: el.tagName.toLowerCase(),
      src: el.src || el.currentSrc || (el.querySelector('source') ? el.querySelector('source').src : ''),
      alt: el.alt,
      width: el.width || el.clientWidth,
      height: el.height || el.clientHeight
    };
  }));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'media_assets.json'), JSON.stringify(mediaAssets, null, 2));

  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'network_requests.json'), JSON.stringify(networkRequests, null, 2));
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'console_messages.json'), JSON.stringify(consoleMessages, null, 2));

  console.log('Inspection complete! Closing browser.');
  await browser.close();
}

inspect().catch(err => {
  console.error('Inspection failed:', err);
  process.exit(1);
});
