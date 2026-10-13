const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'inspection_data', 'homepage.html'), 'utf8');

// Find Section - Hero start and end
const heroStart = html.indexOf('data-framer-name="Section - Hero"');
const heroEnd = html.indexOf('data-framer-name="Section - Playreel"');

const heroHtml = html.substring(heroStart - 50, heroEnd);
fs.writeFileSync('inspection_data/hero_exact.html', heroHtml);
console.log('Saved hero_exact.html, length:', heroHtml.length);
