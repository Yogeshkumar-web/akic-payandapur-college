import { db } from '@/lib/db'
import { contactSubmissions } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { resolveQuery } from '@/app/admin/actions'
import Button from '@/components/ui/Button'

export default async function AdminContactPage() {
  const submissions = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt))

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Submissions</h2>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {submissions.map((submission) => (
            <li key={submission.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {submission.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {submission.email} {submission.phone && `• ${submission.phone}`}
                  </p>
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                    {submission.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Received on {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 shrink-0 flex flex-col items-end gap-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.status}
                  </span>
                  
                  {submission.status !== 'resolved' && (
                    <form action={resolveQuery}>
                      <input type="hidden" name="id" value={submission.id} />
                      <Button variant="outline" type="submit" className="text-xs px-2 py-1">
                        Mark Resolved
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
          {submissions.length === 0 && (
            <li className="p-6 text-center text-gray-500">
              No submissions found.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
