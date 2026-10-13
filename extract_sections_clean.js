const fs = require('fs');

const html = fs.readFileSync('inspection_data/homepage.html', 'utf8');

function extractBlock(marker, filename, length = 40000) {
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const start = html.lastIndexOf('<div', idx);
    const snippet = html.substring(start, start + length);
    fs.writeFileSync('inspection_data/' + filename, snippet);
    console.log(`Saved ${filename} (${snippet.length} chars)`);
  } else {
    console.log(`Marker not found: ${marker}`);
  }
}

extractBlock('data-framer-name="Section - Services"', 'services_full.html', 50000);
extractBlock('data-framer-name="Section - Templates"', 'templates_full.html', 50000);
extractBlock('data-framer-name="Section - Testimonial"', 'testimonial_full.html', 30000);
