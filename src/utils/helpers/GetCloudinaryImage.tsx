
export function getCloudinaryImageUrl(publicId: string) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
}
