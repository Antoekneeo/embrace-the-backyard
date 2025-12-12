const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Ensure the animals directory exists
const animalsDir = path.join(process.cwd(), 'public/animals');
if (!fs.existsSync(animalsDir)) {
  fs.mkdirSync(animalsDir, { recursive: true });
}

// Alternative image sources (direct image URLs)
const images = [
  {
    name: 'blue-tongue-lizard',
    url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=1200&q=80',
  },
  {
    name: 'ringtail-possum',
    url: 'https://images.unsplash.com/photo-1583511655826-057004d788a4?w=1200&q=80',
  },
  {
    name: 'lorikeet',
    url: 'https://images.unsplash.com/photo-1551085254-e94dfd6fdf85?w=1200&q=80',
  },
  {
    name: 'huntsman-spider',
    url: 'https://images.unsplash.com/photo-1550251607-fb9c6d2c8d3e?w=1200&q=80',
  },
  {
    name: 'australian-magpie',
    url: 'https://images.unsplash.com/photo-1551085254-6a3c4f8c4b8e?w=1200&q=80',
  },
  {
    name: 'snakes',
    url: 'https://images.unsplash.com/photo-1551085254-8b7d6a3e8f8f?w=1200&q=80',
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
