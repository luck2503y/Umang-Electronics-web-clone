const fs = require('fs');
const content = fs.readFileSync('inspection_data/loader_component_script.js', 'utf8');

// Find all matches for "ms =" or transition definitions
const re = /transition\s*:\s*\{[^}]+\}/g;
let m;
const transitions = new Set();
while ((m = re.exec(content)) !== null) {
  transitions.add(m[0]);
}
console.log('Unique transitions found:', Array.from(transitions).slice(0, 15));

// Find variants or animations for Intro
const introIdx = content.indexOf('Intro-1');
// Let's search backwards from Intro-1 to find the component or variants
console.log('Search for "GNC1HvMav" in file:');
let idx = 0;
while ((idx = content.indexOf('GNC1HvMav', idx)) !== -1) {
  console.log('Found GNC1HvMav at', idx, ':\n', content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
  idx += 9;
}
