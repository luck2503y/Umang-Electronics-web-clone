const https = require('https');
const fs = require('fs');

const fileTitles = {
  'toaster': ['File:Toaster.png', 'File:Toast in a toaster.jpg', 'File:Dualit_toaster.jpg', 'File:Electric toaster.jpg'],
  'air-fryer': ['File:Air fryer interior.jpg', 'File:Philips Airfryer.jpg', 'File:Airfryer.jpg', 'File:Air fryer.jpg'],
  'induction-cooktop': ['File:Kookplaat inductie.JPG', 'File:Induction cooktop.jpg', 'File:Induktionsofen.jpg'],
  'otg-oven-toaster-griller': ['File:Zojirushi toaster oven ET-TB15 2.jpg', 'File:Toaster oven.jpg', 'File:Electric oven.jpg'],
  'mixer-grinder': ['File:Kitchen blender.jpg', 'File:Blender jar.jpg', 'File:Food blender.jpg', 'File:Blender.jpg'],
  'juicer': ['File:Centrifugal juicer.jpg', 'File:Electric juicer.jpg', 'File:Juicer machine.jpg', 'File:Juice extractor.jpg'],
  'hand-mixer': ['File:Hand mixer.jpg', 'File:Electric hand mixer.jpg', 'File:Handheld mixer.jpg'],
  'electric-chopper': ['File:Mini food processor.jpg', 'File:Chopper kitchen.jpg', 'File:Food chopper.jpg'],
  'roti-maker': ['File:Tortillero y masa pa tortillas.JPG', 'File:Tortilla press.jpg', 'File:Electric tortilla press.jpg'],
  'deep-fryer': ['File:Deep fryer.jpg', 'File:Electric deep fryer.jpg', 'File:Deep-fryer.jpg'],
  'projector': ['File:Video projector.jpg', 'File:InFocus IN34.jpg', 'File:LCD projector.jpg'],
  'dvd-player': ['File:DVD player.jpg', 'File:Sony DVD player.jpg', 'File:DVD-Player.jpg'],
  'set-top-box': ['File:Set-top box.jpg', 'File:Pace DC757X cable box.jpg', 'File:Digital television set-top box.jpg'],
  'android-tv-box': ['File:Apple TV. 1st generation-2290.jpg', 'File:Digital media player.jpg', 'File:Smart TV box.jpg'],
  'multimedia-speakers': ['File:Computer speakers.jpg', 'File:Desktop speakers.jpg', 'File:Loudspeaker system.jpg']
};

function getFileInfo(title) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url|size&format=json';
    https.get(url, { headers: { 'User-Agent': 'UmangApp/1.0 (info@umang.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const page = Object.values(json.query.pages)[0];
          if (page && page.imageinfo && page.imageinfo[0]) {
            resolve({
              title,
              url: page.imageinfo[0].url,
              size: page.imageinfo[0].size
            });
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const verified = {};
  for (const [id, list] of Object.entries(fileTitles)) {
    for (const title of list) {
      const info = await getFileInfo(title);
      if (info && info.url) {
        console.log(id, '-> FOUND', info.title, info.url);
        verified[id] = info.url;
        break;
      }
    }
  }
  fs.writeFileSync('verified_commons_urls.json', JSON.stringify(verified, null, 2));
}

run();
