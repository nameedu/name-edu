
import { supabase } from './client';

/**
 * Uploads a file to the specified storage bucket
 * @param file File to upload
 * @param bucket Bucket name
 * @returns Object containing the file path if successful, or error if failed
 */
export const uploadFile = async (file: File, bucket: string = 'notice-attachments') => {
  try {
    // Create a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    // Upload the file to storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) throw error;
    
    return { filePath: fileName };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error };
  }
};

/**
 * Gets the public URL for a file in storage
 * @param filePath Path of the file in the bucket
 * @param bucket Bucket name
 * @returns Public URL string
 */
export const getFileUrl = (filePath: string, bucket: string = 'notice-attachments') => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * Deletes a file from storage
 * @param filePath Path of the file in the bucket
 * @param bucket Bucket name
 * @returns Success status
 */
export const deleteFile = async (filePath: string, bucket: string = 'notice-attachments') => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { error, success: false };
  }
};
