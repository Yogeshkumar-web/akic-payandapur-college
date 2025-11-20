# Troubleshooting: Unauthorized Error on Study Materials Upload

## Issue

You're getting an "Unauthorized" error when trying to upload study materials, even though you've created the Supabase storage bucket.

## Quick Diagnosis Steps

### Step 1: Check if You're Logged In

1. Navigate to `http://localhost:3000/admin/study-materials`
2. Click the **"Check Auth"** button (gray button next to "Upload New Material")
3. A popup will show your authentication status

**Expected Result:**

```json
{
  "authenticated": true,
  "user": {
    "id": "...",
    "email": "your-email@example.com",
    "role": "authenticated"
  }
}
```

**If you see `"authenticated": false`:**

- You're not logged in
- Go to Step 2

### Step 2: Verify Admin User Exists in Supabase

1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Click **Authentication** in the left sidebar
4. Click **Users** tab
5. Check if there's a user created

**If NO users exist:**

1. Click **"Add user"** → **"Create new user"**
2. Enter:
   - **Email:** `admin@akicpayandapur.edu` (or your preferred email)
   - **Password:** Create a strong password (remember this!)
   - **Auto Confirm User:** Toggle this **ON**
3. Click **"Create user"**

### Step 3: Log In to the Application

1. Go to `http://localhost:3000/login`
2. Enter the email and password you created in Supabase
3. Click **"Sign In"**
4. You should be redirected to the homepage
5. Navigate to `http://localhost:3000/admin/study-materials`

### Step 4: Test Upload Again

1. Click **"Upload New Material"**
2. Fill in the form:
   - **Title:** Test Material
   - **Class:** 9
   - **Subject:** Mathematics
   - **File:** Select a small PDF file (under 10MB)
3. Click **"Upload Material"**

## Common Issues and Solutions

### Issue 1: "Invalid login credentials"

**Cause:** The email/password doesn't match any user in Supabase.

**Solution:**

1. Go to Supabase Dashboard → Authentication → Users
2. Verify the email address matches exactly
3. If needed, reset the password:
   - Click on the user
   - Click **"Reset password"**
   - Set a new password
   - Try logging in again

### Issue 2: Login succeeds but still getting "Unauthorized"

**Cause:** Session cookies might not be persisting correctly.

**Solution:**

1. Clear your browser cookies for `localhost:3000`
2. Restart the dev server:
   ```bash
   # Stop the server (Ctrl+C)
   pnpm dev
   ```
3. Log in again

### Issue 3: "Storage bucket not configured"

**Cause:** The `study-materials` bucket doesn't exist in Supabase.

**Solution:** See [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md)

### Issue 4: Environment variables not set

**Cause:** Missing or incorrect Supabase credentials.

**Solution:**

1. Check if `.env.local` exists in the project root
2. Verify it contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Get these values from Supabase Dashboard → Settings → API
4. Restart the dev server after updating `.env.local`

## Debugging with Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try uploading a file
4. Look for error messages

**Common console errors:**

- `"Upload failed: User not authenticated"` → You're not logged in
- `"Supabase storage upload error: Bucket not found"` → Create the storage bucket
- `"Failed to upload file: permission denied"` → Check bucket policies

## Debugging with Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try uploading a file
4. Look for the `/api/upload` request
5. Click on it and check the **Response** tab

**What to look for:**

- Status 401: Not authenticated
- Status 403: Permission denied
- Status 500: Server error (check terminal logs)

## Server-Side Logs

Check your terminal where `pnpm dev` is running. You should see detailed logs:

```
Uploading file: test.pdf (12345 bytes) to materials/abc123.pdf
File uploaded successfully: https://...
```

Or error messages like:

```
Upload failed: User not authenticated
Supabase storage upload error: Bucket not found
```

## Still Having Issues?

1. **Check Supabase Project Status:**

   - Free tier projects pause after 7 days of inactivity
   - Go to Supabase Dashboard and check if project is active
   - Click "Restore" if paused

2. **Verify All Environment Variables:**

   ```bash
   # In terminal
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **Check Browser Cookies:**

   - Open DevTools → Application → Cookies
   - Look for cookies from `localhost:3000`
   - Should see Supabase auth cookies (sb-\*-auth-token)

4. **Try Incognito/Private Window:**
   - Sometimes browser extensions interfere
   - Try logging in and uploading in incognito mode

## Quick Test Checklist

- [ ] Supabase project is active (not paused)
- [ ] `.env.local` file exists with correct values
- [ ] Admin user exists in Supabase Authentication
- [ ] `study-materials` bucket exists in Supabase Storage
- [ ] Bucket is set to public
- [ ] Can log in successfully at `/login`
- [ ] "Check Auth" button shows `authenticated: true`
- [ ] Browser console shows no errors
- [ ] Terminal shows no errors

If all checkboxes are checked and you're still having issues, there may be a deeper configuration problem. Check the Supabase logs in the dashboard for more details.
