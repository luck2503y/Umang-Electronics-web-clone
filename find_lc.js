const https = require('https');

https.get('https://framerusercontent.com/sites/7vFNuBjjmgWQGw1uf5GxGn/Et081ix_dYu8BClba53nJnbmR0uc7wBHg7JAea0LlIc.C77gdbFy.mjs', res => {
  let text = '';
  res.on('data', c => text += c);
  res.on('end', () => {
    const regex = /\bLc\s*=\s*[^;]+;/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      console.log('MATCH:', match[0].slice(0, 300));
    }
  });
});
