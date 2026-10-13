const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'inspection_data', 'homepage.html'), 'utf8');

// Find service sections or text
const servicesBlock = html.substring(html.indexOf('Our Services'), html.indexOf('Testimonial'));
console.log('--- SERVICES BLOCK SNIPPET ---');
// Clean tags
const cleanText = servicesBlock.replace(/<[^>]+>/g, '\n').replace(/\n\s*\n/g, '\n');
console.log(cleanText.slice(0, 2000));
