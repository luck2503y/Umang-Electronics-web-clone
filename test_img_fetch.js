const https = require('https');
const fs = require('fs');

console.log('Testing network fetch for Unsplash...');
const url = 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'; // Refrigerator
https.get(url, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length']);
}).on('error', (e) => {
  console.error('Error:', e.message);
});
