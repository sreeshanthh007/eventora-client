


const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getCloudinarySignature = async (folder: string) => {
  const response = await fetch(`${BASE_URL}/api/cloudinary/signature?folder=${encodeURIComponent(folder)}`, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(`Failed to get signature: ${response.status}`);
  }

  return await response.json();
};

 
export const uploadImageToCloudinarySigned = async (
  file: Blob,
  folder: string
): Promise<string | null> => {
  try {
    const sigData = await getCloudinarySignature(folder);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sigData.apiKey);
    formData.append("timestamp", sigData.timestamp.toString());
    formData.append("signature", sigData.signature);
    formData.append("folder", sigData.folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`;
      
  


    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    
    return data.public_id || null;
  } catch (error) {
    console.error("Error while uploading to Cloudinary:", error);
    return null;
  }
};
