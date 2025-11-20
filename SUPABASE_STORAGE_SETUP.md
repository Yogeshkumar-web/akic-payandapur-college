# Supabase Storage Setup Guide

## Issue: Study Materials Upload Not Working

If you're unable to upload study materials, it's likely because the Supabase storage bucket hasn't been created yet.

## Solution: Create the Storage Bucket

Follow these steps to set up the storage bucket:

### Step 1: Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project

### Step 2: Create Storage Bucket

1. Click on **Storage** in the left sidebar
2. Click the **"New bucket"** button
3. Configure the bucket:
   - **Name:** `study-materials` (must be exactly this name)
   - **Public bucket:** Toggle this **ON** (so uploaded files can be accessed publicly)
   - **File size limit:** 10MB (optional, but recommended)
   - **Allowed MIME types:** Leave empty or specify: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-powerpoint`, `application/vnd.openxmlformats-officedocument.presentationml.presentation`
4. Click **"Create bucket"**

### Step 3: Configure Bucket Policies (REQUIRED!)

⚠️ **CRITICAL:** Without these policies, you'll get "row-level security policy" errors!

**Quick Method - Using SQL Editor:**

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New query"**
3. Copy and paste the contents of [`supabase_storage_policies.sql`](./supabase_storage_policies.sql)
4. Click **"Run"** or press `Ctrl+Enter`
5. Verify success message appears

**Manual Method - Using Storage UI:**

See detailed step-by-step instructions in [`FIX_RLS_POLICY_ERROR.md`](./FIX_RLS_POLICY_ERROR.md)

**What these policies do:**

- Allow authenticated users to upload files (INSERT)
- Allow public access to view/download files (SELECT)
- Allow authenticated users to update files (UPDATE)
- Allow authenticated users to delete files (DELETE)

#### Policy 1: Allow Public Read Access

```sql
-- Name: Public read access
-- Operation: SELECT
-- Policy:
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'study-materials');
```

#### Policy 2: Allow Authenticated Upload

```sql
-- Name: Authenticated users can upload
-- Operation: INSERT
-- Policy:
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'study-materials'
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Allow Authenticated Delete

```sql
-- Name: Authenticated users can delete
-- Operation: DELETE
-- Policy:
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'study-materials'
  AND auth.role() = 'authenticated'
);
```

### Step 4: Test the Upload

1. Go to your application at `http://localhost:3000/login`
2. Log in with your admin credentials
3. Navigate to `/admin/study-materials`
4. Click **"Upload New Material"**
5. Fill in the form and select a file (PDF, DOC, DOCX, PPT, or PPTX)
6. Click **"Upload Material"**

### Troubleshooting

If you still encounter issues:

1. **Check the browser console** (F12) for error messages
2. **Check the terminal** where `pnpm dev` is running for server-side errors
3. **Verify environment variables** in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` should be set
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be set
4. **Verify authentication** - Make sure you're logged in as an admin user
5. **Check file size** - Files must be under 10MB
6. **Check file type** - Only PDF, DOC, DOCX, PPT, and PPTX files are allowed

### Common Error Messages

- **"Storage bucket not configured"** → The `study-materials` bucket doesn't exist. Follow Step 2 above.
- **"Permission denied"** → The bucket exists but doesn't have the right policies. Follow Step 3 above.
- **"Unauthorized"** → You're not logged in. Go to `/login` first.
- **"File size exceeds 10MB limit"** → Choose a smaller file.

## Additional Notes

- The storage bucket name **must be exactly** `study-materials` (with a hyphen, not underscore)
- Make sure the bucket is set to **public** so that students can download the materials
- Uploaded files are stored in the `materials/` folder within the bucket
- File names are automatically generated with a unique identifier to prevent conflicts

## Need More Help?

If you continue to experience issues:

1. Check the Supabase dashboard for any error messages
2. Review the server logs in your terminal
3. Ensure your Supabase project is active and not paused (free tier projects pause after inactivity)
