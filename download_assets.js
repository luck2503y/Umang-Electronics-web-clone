const fs = require('fs');
const path = require('path');
const https = require('https');

const PUBLIC_ASSETS = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(PUBLIC_ASSETS)) {
  fs.mkdirSync(PUBLIC_ASSETS, { recursive: true });
}

// Extract all framer asset URLs from inspection_data html files
const inspectionDir = path.join(__dirname, 'inspection_data');
const htmlFiles = fs.readdirSync(inspectionDir).filter(f => f.endsWith('.html'));

const assetUrls = new Set();
// Add fonts
assetUrls.add("https://framerusercontent.com/assets/tMTRMPmybaHx0IPae0t8iCda4.woff2");
assetUrls.add("https://framerusercontent.com/assets/LWqutRi2ylYfA1k62YXyS5DPA.woff2");
assetUrls.add("https://framerusercontent.com/assets/b2K15NaOm6mFyCncGy3lk8jg.woff2");
assetUrls.add("https://framerusercontent.com/images/EDYH2v7dIjgck6hTGPNbn8hKA.png"); // favicon

for (const f of htmlFiles) {
  const content = fs.readFileSync(path.join(inspectionDir, f), 'utf8');
  // Match framerusercontent images and assets
  const matches = content.match(/https:\/\/(framerusercontent\.com\/(images|assets)\/[a-zA-Z0-9_\-\.]+)/g) || [];
  for (const m of matches) {
    // strip query params
    const clean = m.split('?')[0];
    assetUrls.add(clean);
  }
}

console.log(`Found ${assetUrls.size} unique assets to download.`);
fs.writeFileSync(path.join(inspectionDir, 'all_asset_urls.json'), JSON.stringify(Array.from(assetUrls), null, 2));

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve(); // already downloaded
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        resolve(); // resolve anyway so we don't break batch
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      resolve();
    });
  });
}

async function run() {
  const map = {};
  let count = 0;
  for (const url of Array.from(assetUrls)) {
    const filename = path.basename(url);
    const dest = path.join(PUBLIC_ASSETS, filename);
    await download(url, dest);
    map[url] = `/assets/${filename}`;
    count++;
    if (count % 20 === 0) console.log(`Downloaded ${count}/${assetUrls.size}`);
  }
  fs.writeFileSync(path.join(inspectionDir, 'asset_map.json'), JSON.stringify(map, null, 2));
  console.log(`Done downloading assets! Total: ${count}`);
}

run();
