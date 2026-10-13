const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'inspection_data', 'homepage.html'), 'utf8');

function extractSection(name) {
  const start = html.indexOf(`data-framer-name="${name}"`);
  if (start === -1) {
    console.log(`Section not found: ${name}`);
    return;
  }
  // Find opening <div
  const divStart = html.lastIndexOf('<div', start);
  // Get slice of 10000 chars
  const slice = html.substring(divStart, divStart + 12000);
  fs.writeFileSync(`inspection_data/sec_${name.replace(/[^a-zA-Z0-9]/g, '_')}.html`, slice);
  console.log(`Saved sec_${name}.html`);
}

extractSection('Section - Playreel');
extractSection('Section - Introduction');
extractSection('Section - Services');
extractSection('Section - Testimonial');
extractSection('Section - Templates');
extractSection('Section - FAQ');
extractSection('Section - CTA');
extractSection('Desktop - On Dark'); // Header
