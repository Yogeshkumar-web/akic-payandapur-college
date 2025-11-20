import { createClient } from '@/lib/supabase/client';

export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('study-materials')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('study-materials')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function deleteFile(fileUrl: string) {
  const supabase = createClient();
  
  // Extract the file path from the URL
  const url = new URL(fileUrl);
  const pathParts = url.pathname.split('/study-materials/');
  if (pathParts.length < 2) return;
  
  const filePath = pathParts[1];

  const { error } = await supabase.storage
    .from('study-materials')
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

