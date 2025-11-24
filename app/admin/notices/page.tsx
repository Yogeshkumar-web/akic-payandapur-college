'use client'

import { addNotice } from '@/app/admin/actions'
import Button from '@/components/ui/Button'
import { useActionState } from 'react'

const initialState = {
  message: '',
}

export default function AddNoticePage() {
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

        <div className="flex justify-end">
          <Button type="submit">
            Post Notice
          </Button>
        </div>
      </form>
    </div>
  )
}
