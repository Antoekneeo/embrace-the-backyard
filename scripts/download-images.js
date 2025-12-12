const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Ensure the animals directory exists
const animalsDir = path.join(process.cwd(), 'public/animals');
if (!fs.existsSync(animalsDir)) {
  fs.mkdirSync(animalsDir, { recursive: true });
}

// Animal image sources (Pexels free-to-use images)
const images = [
  {
    name: 'blue-tongue-lizard',
    url: 'https://images.pexels.com/photos/674570/pexels-photo-674570.jpeg',
  },
  {
    name: 'ringtail-possum',
    url: 'https://images.pexels.com/photos/7053464/pexels-photo-7053464.jpeg',
  },
  {
    name: 'lorikeet',
    url: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg',
  },
  {
    name: 'huntsman-spider',
    url: 'https://images.pexels.com/photos/674941/pexels-photo-674941.jpeg',
  },
  {
    name: 'australian-magpie',
    url: 'https://images.pexels.com/photos/917294/pexels-photo-917294.jpeg',
  },
  {
    name: 'snakes',
    url: 'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg',
  },
];

// Download and process each image
async function downloadAndProcessImages() {
  for (const img of images) {
    try {
      // Download the image
      const response = await new Promise((resolve) => {
        https.get(img.url, (res) => {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', (e) => {
          console.error(`Error downloading ${img.name}:`, e);
          resolve(null);
        });
      });

      if (!response) continue;

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

      console.log(`✅ Processed ${img.name} images`);
    } catch (error) {
      console.error(`Error processing ${img.name}:`, error);
    }
  }
}

downloadAndProcessImages();
