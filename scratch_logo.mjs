import sharp from 'sharp';

async function processImage() {
  const inputPath = 'c:/Games/work/vambadiye_vanth_vela/ma_ai/src/assets/Ma_footer_logo_200x160.png';
  const outputPath = 'c:/Games/work/vambadiye_vanth_vela/ma_ai/public/logo.png';
  
  // Read image, get raw pixels
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  // Loop through pixels and make near-black pixels transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 30 && g < 30 && b < 30) {
      data[i + 3] = 0; // Set alpha to 0
    }
  }
  
  // Create a square image by padding the original image
  const size = Math.max(info.width, info.height);
  
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .extend({
    top: Math.floor((size - info.height) / 2),
    bottom: Math.ceil((size - info.height) / 2),
    left: Math.floor((size - info.width) / 2),
    right: Math.ceil((size - info.width) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .png()
  .toFile(outputPath);
  
  console.log("Done");
}

processImage().catch(console.error);
