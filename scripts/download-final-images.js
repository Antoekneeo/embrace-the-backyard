const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Ensure the animals directory exists
const animalsDir = path.join(process.cwd(), 'public/animals');
if (!fs.existsSync(animalsDir)) {
  fs.mkdirSync(animalsDir, { recursive: true });
}

// Final set of image URLs from a reliable source
const images = [
  {
    name: 'blue-tongue-lizard',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Blue-tongued_skink_%28Tiliqua_scincoides%29_2.jpg/1200px-Blue-tongued_skink_%28Tiliqua_scincoides%29_2.jpg',
  },
  {
    name: 'ringtail-possum',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Common_Ringtail_Possum_-_Fitzroy_Melbourne_Australia_%28cropped%29.jpg/1200px-Common_Ringtail_Possum_-_Fitzroy_Melbourne_Australia_%28cropped%29.jpg',
  },
  {
    name: 'lorikeet',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rainbow_Lorikeet_%28Trichoglossus_moluccanus%29.jpg/1200px-Rainbow_Lorikeet_%28Trichoglossus_moluccanus%29.jpg',
  },
  {
    name: 'huntsman-spider',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Huntsman_spider_%28Heteropoda_sp.%29.jpg/1200px-Huntsman_spider_%28Heteropoda_sp.%29.jpg',
  },
  {
    name: 'australian-magpie',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Australian_Magpie_%28Gymnorhina_tibicen_tyrannica%29.jpg/1200px-Australian_Magpie_%28Gymnorhina_tibicen_tyrannica%29.jpg',
  },
  {
    name: 'snakes',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Coastal_Taipan_%28Oxyuranus_scutellatus%29.jpg/1200px-Coastal_Taipan_%28Oxyuranus_scutellatus%29.jpg',
  },
];

// Download and process each image
async function downloadAndProcessImages() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img.name}...`);
      
      // Download the image with a proper user agent
      const response = await new Promise((resolve, reject) => {
        const req = https.get(img.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }, (res) => {
          if (res.statusCode !== 200) {
            return reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
          
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        });
        
        req.on('error', (e) => {
          reject(e);
        });
        
        req.end();
      });

      if (!response || response.length === 0) {
        console.error(`No data received for ${img.name}`);
        continue;
      }

      console.log(`Processing ${img.name}...`);
      
      // Process hero image (1200x675)
      await sharp(response)
        .resize(1200, 675, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(path.join(animalsDir, `${img.name}-hero.jpg`));

      // Process thumbnail (400x225)
      await sharp(response)
        .resize(400, 225, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(path.join(animalsDir, `${img.name}-thumb.jpg`));

      console.log(`✅ Successfully processed ${img.name}`);
    } catch (error) {
      console.error(`❌ Error processing ${img.name}:`, error.message);
    }
  }
}

downloadAndProcessImages()
  .then(() => console.log('✅ All images processed!'))
  .catch(console.error);
