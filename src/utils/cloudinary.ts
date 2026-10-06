export function getCloudinaryVideoUrl(localPath: string): string {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    // Fallback to local path if Cloudinary is not configured
    return localPath;
  }
  
  // The local path is something like "/videos/showreel-Brandfilms/SHOW REEL HD (2) (1).mp4"
  // We need to remove the leading slash and the extension to get the public_id based on our upload script
  // Wait, actually, Cloudinary delivery URL supports just the public_id which is "ma_ai/videos/..."
  
  let relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath; // "videos/showreel-Brandfilms/..."
  
  // Remove the file extension
  relativePath = relativePath.replace(/\.[^/.]+$/, "");
  
  // Remove trailing spaces which are invalid in Cloudinary public IDs
  relativePath = relativePath.trim();
  
  // Encode URI components to handle spaces in filenames correctly
  const encodedPath = relativePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/ma_ai/${encodedPath}.mp4`;
}
