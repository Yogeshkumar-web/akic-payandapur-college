import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('Upload failed: User not authenticated');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('Upload failed: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.error(`Upload failed: File too large (${file.size} bytes)`);
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `materials/${fileName}`;

    console.log(`Uploading file: ${file.name} (${file.size} bytes) to ${filePath}`);

    // Convert File to ArrayBuffer then to Buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('study-materials')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      
      // Provide specific error messages
      if (error.message.includes('Bucket not found')) {
        return NextResponse.json({ 
          error: 'Storage bucket not configured. Please create a "study-materials" bucket in Supabase Storage.' 
        }, { status: 500 });
      }
      
      if (error.message.includes('permission')) {
        return NextResponse.json({ 
          error: 'Permission denied. Please check storage bucket policies.' 
        }, { status: 403 });
      }
      
      return NextResponse.json({ 
        error: `Failed to upload file: ${error.message}` 
      }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from('study-materials')
      .getPublicUrl(filePath);

    console.log(`File uploaded successfully: ${urlData.publicUrl}`);
    return NextResponse.json({ fileUrl: urlData.publicUrl });
  } catch (error) {
    console.error('Unexpected upload error:', error);
    return NextResponse.json({ 
      error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

