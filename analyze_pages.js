const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, 'inspection_data');
const files = fs.readdirSync(ARTIFACTS_DIR).filter(f => f.endsWith('.html'));

const summary = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(ARTIFACTS_DIR, file), 'utf8');
  
  // Extract title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  // Extract meta description
  const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  const description = descMatch ? descMatch[1] : '';

  // Extract all images
  const imgRegex = /<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g;
  const images = [];
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    images.push({ src: m[1], alt: m[2] });
  }

  // Also extract background images or video sources
  const videoRegex = /<source[^>]*src="([^"]+)"[^>]*>/g;
  const videos = [];
  while ((m = videoRegex.exec(content)) !== null) {
    videos.push(m[1]);
  }

  summary[file] = {
    title,
    description,
    imageCount: images.length,
    images: images.slice(0, 15),
    videos,
    size: content.length
  };
}

fs.writeFileSync(path.join(ARTIFACTS_DIR, 'pages_summary.json'), JSON.stringify(summary, null, 2));
console.log('Pages analyzed:', Object.keys(summary));
