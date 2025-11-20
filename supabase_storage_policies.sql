-- Supabase Storage Policies for study-materials bucket
-- Run this SQL in Supabase SQL Editor to fix the RLS policy error

-- 1. Allow authenticated users to upload files (INSERT)
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'study-materials'
);

-- 2. Allow public read access to files (SELECT)
CREATE POLICY "Public can view files"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'study-materials'
);

-- 3. Allow authenticated users to update files (UPDATE)
CREATE POLICY "Authenticated users can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'study-materials'
)
WITH CHECK (
  bucket_id = 'study-materials'
);

-- 4. Allow authenticated users to delete files (DELETE)
CREATE POLICY "Authenticated users can delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'study-materials'
);

-- Verify policies were created
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
