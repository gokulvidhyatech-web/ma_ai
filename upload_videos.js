import { v2 as cloudinary } from 'cloudinary';
import { globSync } from 'glob';
import path from 'path';
import 'dotenv/config';

// Ensure the CLOUDINARY_URL is set in .env
if (!process.env.CLOUDINARY_URL || process.env.CLOUDINARY_URL.includes('<your_api_secret>')) {
  console.error("Error: Please replace <your_api_secret> in your .env file with your actual Cloudinary API secret.");
  process.exit(1);
}

// Explicitly configure Cloudinary
const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL.replace('cloudinary://', 'http://'));
cloudinary.config({
  cloud_name: cloudinaryUrl.hostname,
  api_key: cloudinaryUrl.username,
  api_secret: cloudinaryUrl.password,
});

// Uploads a single file to Cloudinary
async function uploadVideo(filePath) {
  try {
    // We use the relative path from public/videos as the public_id in Cloudinary
    let relativePath = path.relative(path.join(process.cwd(), 'public', 'videos'), filePath);
    // Convert Windows backslashes to forward slashes
    relativePath = relativePath.split(path.sep).join('/');
    
    // Remove the extension to use as public_id (Cloudinary handles the extension)
    let baseName = relativePath.replace(/\.[^/.]+$/, "");
    // Cloudinary errors out if public_id ends in a whitespace
    baseName = baseName.trim();
    
    const publicId = `ma_ai/videos/${baseName}`;

    console.log(`Uploading ${filePath} to Cloudinary as ${publicId}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      public_id: publicId,
      overwrite: true,
    });
    
    console.log(`Success! URL: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error);
  }
}

async function main() {
  const videoFiles = globSync('public/videos/**/*.mp4');
  console.log(`Found ${videoFiles.length} video files to upload.`);

  for (const file of videoFiles) {
    await uploadVideo(file);
  }
  
  console.log("Finished uploading all videos!");
}

main();
