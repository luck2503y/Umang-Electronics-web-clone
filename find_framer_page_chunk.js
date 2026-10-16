const https = require('https');

https.get('https://framerusercontent.com/sites/7vFNuBjjmgWQGw1uf5GxGn/script_main.D5QD7EHo.mjs', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^'"`\s\)]+/g) || [];
    console.log('URLs:', urls);
  });
});
