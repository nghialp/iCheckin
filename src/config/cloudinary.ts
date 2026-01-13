// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dqqymdllv',
  UPLOAD_PRESET: 'icheckin_upload',
  API_URL: 'https://api.cloudinary.com/v1_1/dqqymdllv/image/upload',
};

export const uploadImageToCloudinary = async (
  imageUri: string,
  fileName: string
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: fileName,
    } as any);
    formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_CONFIG.API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};
