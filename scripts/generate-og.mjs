import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgImage() {
  const svgBuffer = fs.readFileSync(path.resolve('./public/favicon.svg'));
  
  // Create a 1200x630 white background with rounded corners (to match favicon feel)
  const bg = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 248, g: 250, b: 252, alpha: 1 } } // bg-slate-50
  }).png().toBuffer();

  // Resize SVG to fit nicely in the middle
  const resizedSvg = await sharp(svgBuffer).resize(600, 600).png().toBuffer();

  await sharp(bg).composite([{ input: resizedSvg, gravity: 'center' }]).toFile(path.resolve('./public/og-image.png'));
  console.log('og-image.png successfully generated in public directory.');
}

generateOgImage().catch(console.error);
