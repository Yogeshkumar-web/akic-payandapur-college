import { db } from '@/lib/db'
import { notices, studyMaterials, users } from '@/db/schema'
import { count } from 'drizzle-orm'

export default async function AdminDashboard() {
  // Fetch stats
  const [noticesCount] = await db.select({ count: count() }).from(notices)
  const [materialsCount] = await db.select({ count: count() }).from(studyMaterials)
  const [usersCount] = await db.select({ count: count() }).from(users)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Notices</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{noticesCount.count}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Study Materials</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{materialsCount.count}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{usersCount.count}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
            {/* Add quick action buttons here if needed */}
        </div>
      </div>
    </div>
  )
}
