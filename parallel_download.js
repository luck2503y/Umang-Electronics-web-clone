const fs = require('fs');
const path = require('path');
const https = require('https');

const PUBLIC_ASSETS = path.join(__dirname, 'public', 'assets');
const assetUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'inspection_data', 'all_asset_urls.json'), 'utf8'));

function downloadOne(url) {
  return new Promise((resolve) => {
    const filename = path.basename(url);
    const dest = path.join(PUBLIC_ASSETS, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        file.close();
        fs.unlink(dest, () => {});
        resolve();
      }
    });
    req.on('error', () => {
      file.close();
      fs.unlink(dest, () => {});
      resolve();
    });
    req.setTimeout(8000, () => {
      req.destroy();
      file.close();
      fs.unlink(dest, () => {});
      resolve();
    });
  });
}

async function run() {
  const queue = [...assetUrls];
  const workers = Array(6).fill(0).map(async () => {
    while (queue.length > 0) {
      const u = queue.shift();
      if (u) await downloadOne(u);
    }
  });
  await Promise.all(workers);
  console.log('All remaining downloads finished!');
}

run();
