# Fix: Row-Level Security Policy Error

## Error Message

```
Failed to upload file: new row violates row-level security policy
```

## What This Means

- ✅ You're authenticated
- ✅ The storage bucket exists
- ❌ The bucket's security policies are blocking uploads

## Solution: Add Storage Policies

### Method 1: Using SQL Editor (Recommended)

#### Step 1: Open SQL Editor

1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **"New query"**

#### Step 2: Run the Policy Script

1. Copy the contents of `supabase_storage_policies.sql` (in this project)
2. Paste it into the SQL Editor
3. Click **"Run"** or press `Ctrl+Enter`

You should see a success message.

#### Step 3: Verify Policies

1. Go to **Storage** → `study-materials` bucket
2. Click **Policies** tab
3. You should see 4 policies:
   - ✅ Authenticated users can upload files
   - ✅ Public can view files
   - ✅ Authenticated users can update files
   - ✅ Authenticated users can delete files

### Method 2: Using Storage UI (Alternative)

#### Step 1: Go to Storage Policies

1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Click **Storage** in the left sidebar
4. Click on the `study-materials` bucket
5. Click the **Policies** tab
6. Click **"New policy"**

#### Step 2: Create Upload Policy

1. Click **"Create a policy from scratch"**
2. Fill in:
   - **Policy name:** `Authenticated users can upload files`
   - **Allowed operation:** Check **INSERT**
   - **Target roles:** Select **authenticated**
   - **USING expression:** Leave empty
   - **WITH CHECK expression:**
     ```sql
     bucket_id = 'study-materials'
     ```
3. Click **"Review"** then **"Save policy"**

#### Step 3: Create Read Policy

1. Click **"New policy"** again
2. Click **"Create a policy from scratch"**
3. Fill in:
   - **Policy name:** `Public can view files`
   - **Allowed operation:** Check **SELECT**
   - **Target roles:** Select **public**
   - **USING expression:**
     ```sql
     bucket_id = 'study-materials'
     ```
   - **WITH CHECK expression:** Leave empty
4. Click **"Review"** then **"Save policy"**

#### Step 4: Create Update Policy

1. Click **"New policy"** again
2. Click **"Create a policy from scratch"**
3. Fill in:
   - **Policy name:** `Authenticated users can update files`
   - **Allowed operation:** Check **UPDATE**
   - **Target roles:** Select **authenticated**
   - **USING expression:**
     ```sql
     bucket_id = 'study-materials'
     ```
   - **WITH CHECK expression:**
     ```sql
     bucket_id = 'study-materials'
     ```
4. Click **"Review"** then **"Save policy"**

#### Step 5: Create Delete Policy

1. Click **"New policy"** again
2. Click **"Create a policy from scratch"**
3. Fill in:
   - **Policy name:** `Authenticated users can delete files`
   - **Allowed operation:** Check **DELETE**
   - **Target roles:** Select **authenticated**
   - **USING expression:**
     ```sql
     bucket_id = 'study-materials'
     ```
   - **WITH CHECK expression:** Leave empty
4. Click **"Review"** then **"Save policy"**

## Test the Upload

After adding the policies:

1. Go to `http://localhost:3000/admin/study-materials`
2. Click **"Upload New Material"**
3. Fill in the form:
   - **Title:** Test Upload
   - **Class:** 9
   - **Subject:** Mathematics
   - **File:** Select a PDF file (under 10MB)
4. Click **"Upload Material"**

You should see: **"Study material uploaded successfully!"**

## Understanding the Policies

### Policy 1: Upload (INSERT)

- **Who:** Authenticated users only
- **What:** Can upload new files to the bucket
- **Why:** Only logged-in admins should upload materials

### Policy 2: Read (SELECT)

- **Who:** Everyone (public)
- **What:** Can view/download files
- **Why:** Students need to access study materials without logging in

### Policy 3: Update (UPDATE)

- **Who:** Authenticated users only
- **What:** Can update existing files
- **Why:** Admins might need to replace files

### Policy 4: Delete (DELETE)

- **Who:** Authenticated users only
- **What:** Can delete files
- **Why:** Admins need to remove outdated materials

## Troubleshooting

### "Policy already exists" error

If you see this error when running the SQL:

1. The policies already exist
2. Go to Storage → Policies tab
3. Verify all 4 policies are there
4. If some are missing, create them individually using Method 2

### Still getting RLS error

1. Make sure you're logged in (click "Check Auth" button)
2. Verify the policies target the correct bucket: `study-materials`
3. Check that the policy for INSERT is enabled
4. Try logging out and logging back in

### "Bucket not found" error

This means the bucket name in the policy doesn't match:

- Policy says: `bucket_id = 'study-materials'`
- Your bucket must be named exactly: `study-materials` (with hyphen, not underscore)

## Quick Verification Checklist

After setting up policies, verify:

- [ ] 4 policies exist in Storage → Policies tab
- [ ] INSERT policy targets "authenticated" role
- [ ] SELECT policy targets "public" role
- [ ] UPDATE policy targets "authenticated" role
- [ ] DELETE policy targets "authenticated" role
- [ ] All policies check `bucket_id = 'study-materials'`
- [ ] You can log in successfully
- [ ] "Check Auth" shows authenticated: true
- [ ] Upload works without errors

## Why This Happened

Supabase Storage has **Row Level Security (RLS)** enabled by default for security. This is good! It prevents unauthorized access. However, you need to explicitly define who can do what with the files.

Without policies:

- ❌ Nobody can upload (even authenticated users)
- ❌ Nobody can read files (even public)
- ❌ Nobody can delete files

With our policies:

- ✅ Authenticated users can upload, update, delete
- ✅ Everyone can view/download files
- ✅ Security is maintained

## Alternative: Disable RLS (NOT Recommended)

If you want to quickly test without policies (NOT for production):

1. Go to Storage → `study-materials` bucket
2. Click **Configuration** tab
3. Find **"Row Level Security"**
4. Toggle it OFF

⚠️ **Warning:** This makes your bucket completely open. Anyone can upload/delete files. Only use for testing!

For production, always use proper RLS policies as described above.
