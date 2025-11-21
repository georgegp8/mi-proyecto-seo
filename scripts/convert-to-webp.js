const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const images = [
  'computershop-logo.png',
  'cyccomputer-logo.jpg',
  'pcimpacto-logo.png',
  'sercoplus-logo.jpg'
];

async function convertToWebP() {
  for (const image of images) {
    const inputPath = path.join(imagesDir, image);
    const outputPath = path.join(imagesDir, image.replace(/\.(png|jpg)$/, '.webp'));
    
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 90 })
        .toFile(outputPath);
      
      console.log(`✓ Converted ${image} to WebP`);
    }
  }
  console.log('\n✅ All logos converted to WebP!');
}

convertToWebP().catch(console.error);
