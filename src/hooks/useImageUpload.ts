import { useState } from 'react';
import { Alert } from 'react-native';
import { uploadImageToCloudinary } from '../config/cloudinary';

interface UploadedImage {
  uri: string;
  fileName: string;
  cloudinaryUrl: string | null;
  uploading: boolean;
  error?: string;
}

export const useImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const addImage = (imageUri: string, fileName: string) => {
    if (images.length >= 3) {
      Alert.alert('Giới hạn', 'Tối đa 3 ảnh');
      return false;
    }
    setImages([...images, { uri: imageUri, fileName, cloudinaryUrl: null, uploading: false }]);
    return true;
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadAllImages = async (): Promise<string[]> => {
    if (images.length === 0) return [];

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.cloudinaryUrl) {
          const url = await uploadImageToCloudinary(image.uri, image.fileName);
          if (url) {
            uploadedUrls.push(url);
            // Update image with cloudinary URL
            setImages((prev) =>
              prev.map((img, idx) =>
                idx === i ? { ...img, cloudinaryUrl: url, uploading: false } : img
              )
            );
          }
        } else {
          uploadedUrls.push(image.cloudinaryUrl);
        }
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      Alert.alert('Lỗi', 'Lỗi upload ảnh');
    } finally {
      setUploading(false);
    }

    return uploadedUrls;
  };

  const clearImages = () => {
    setImages([]);
  };

  return {
    images,
    uploading,
    addImage,
    removeImage,
    uploadAllImages,
    clearImages,
  };
};
