import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

async function processImages() {
  try {
    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      
      console.log(`Processing: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

      const tempFile = path.join(imagesDir, `temp_${file}`);

      try {
        let pipeline = sharp(filePath);
        
        // Resize very large images if they are larger than full HD
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });

        if (ext === '.png') {
          await pipeline.png({ quality: 75, compressionLevel: 9 }).toFile(tempFile);
        } else {
          await pipeline.jpeg({ quality: 75, mozjpeg: true }).toFile(tempFile);
        }

        const newStats = fs.statSync(tempFile);
        
        if (newStats.size < stats.size) {
          fs.renameSync(tempFile, filePath);
          console.log(`  -> Compressed to: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
        } else {
          fs.unlinkSync(tempFile);
          console.log(`  -> Original was smaller, skipping.`);
        }
      } catch (err) {
        console.error(`  -> Error processing ${file}:`, err.message);
      }
    }
    
    console.log("Done compressing all images!");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

processImages();
