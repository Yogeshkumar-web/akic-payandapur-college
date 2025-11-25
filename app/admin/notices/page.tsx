'use client'

import { addNotice } from '@/app/admin/actions'
import Button from '@/components/ui/Button'
import { uploadFile } from '@/lib/supabase/storage'
import { useState } from 'react'

export default function AddNoticePage() {
  const [uploading, setUploading] = useState(false)
  const [attachmentUrl, setAttachmentUrl] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await uploadFile(file, 'notices')
      setAttachmentUrl(url)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Notice</h2>
      
      <form action={addNotice} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border text-gray-900"
          >
            <option value="General">General</option>
            <option value="Academic">Academic</option>
            <option value="Events">Events</option>
            <option value="Holidays">Holidays</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachment (Optional)
          </label>
          <p className="text-xs text-gray-500 mb-2">Upload a PDF or image file</p>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.gif"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
          {attachmentUrl && <p className="text-sm text-green-600 mt-2">File uploaded successfully!</p>}
          <input type="hidden" name="attachmentUrl" value={attachmentUrl} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={uploading}>
            Post Notice
          </Button>
        </div>
      </form>
    </div>
  )
}
