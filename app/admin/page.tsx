import Link from "next/link";
import { db } from "@/lib/db";
import { notices, studyMaterials, contactSubmissions } from "@/db/schema";
import { sql } from "drizzle-orm";
import Card from "@/components/ui/Card";

async function getStats() { 
    try {
        const [noticeCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(notices);
        const [materialCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(studyMaterials);
        const [contactCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(contactSubmissions);
        const [pendingCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(contactSubmissions)
            .where(sql`${contactSubmissions.status} = 'pending'`);

        return {
            notices: Number(noticeCount.count) || 0,
            materials: Number(materialCount.count) || 0,
            contacts: Number(contactCount.count) || 0,
            pending: Number(pendingCount.count) || 0,
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            notices: 0,
            materials: 0,
            contacts: 0,
            pending: 0,
        };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            {/* Header */}
            <h1
                className='text-4xl font-bold mb-8'
                style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#0F172A",
                }}
            >
                Dashboard
            </h1>

            {/* Stats grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <Card>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p
                                className='text-gray-600 text-sm mb-1'
                                style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                                Total Notices
                            </p>
                            <h3
                                className='text-3xl font-bold'
                                style={{
                                    color: "#0B5FFF",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {stats.notices}
                            </h3>
                        </div>
                        <div className='text-4xl'>📢</div>
                    </div>
                </Card>

                <Card>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p
                                className='text-gray-600 text-sm mb-1'
                                style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                                Study Materials
                            </p>
                            <h3
                                className='text-3xl font-bold'
                                style={{
                                    color: "#0B5FFF",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {stats.materials}
                            </h3>
                        </div>
                        <div className='text-4xl'>📚</div>
                    </div>
                </Card>

                <Card>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p
                                className='text-gray-600 text-sm mb-1'
                                style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                                Contact Submissions
                            </p>
                            <h3
                                className='text-3xl font-bold'
                                style={{
                                    color: "#0B5FFF",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {stats.contacts}
                            </h3>
                        </div>
                        <div className='text-4xl'>📧</div>
                    </div>
                </Card>

                <Card>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p
                                className='text-gray-600 text-sm mb-1'
                                style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                                Pending Contacts
                            </p>
                            <h3
                                className='text-3xl font-bold'
                                style={{
                                    color: "#FFB703",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {stats.pending}
                            </h3>
                        </div>
                        <div className='text-4xl'>⏳</div>
                    </div>
                </Card>
            </div>

            <Card>
                <h2
                    className='text-2xl font-bold mb-4'
                    style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#0F172A",
                    }}
                >
                    Quick Actions
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Link
                        href='/admin/notices'
                        className='p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center'
                    >
                        <div className='text-3xl mb-2'>➕</div>
                        <p
                            className='font-medium text-gray-700'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            Add New Notice
                        </p>
                    </Link>
                    <Link
                        href='/admin/study-materials'
                        className='p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center'
                    >
                        <div className='text-3xl mb-2'>📤</div>
                        <p
                            className='font-medium text-gray-700'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            Upload Study Material
                        </p>
                    </Link>
                    <Link
                        href='/admin/contacts'
                        className='p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center'
                    >
                        <div className='text-3xl mb-2'>👁️</div>
                        <p
                            className='font-medium text-gray-700'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            View Contact Submissions
                        </p>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

// import { db } from '@/lib/db';
// import { notices, studyMaterials, contactSubmissions } from '@/db/schema';
// import { sql } from 'drizzle-orm';
// import Card from '@/components/ui/Card';

// async function getStats() {
//   try {
//     const [noticeCount] = await db.select({ count: sql<number>`count(*)` }).from(notices);
//     const [materialCount] = await db.select({ count: sql<number>`count(*)` }).from(studyMaterials);
//     const [contactCount] = await db.select({ count: sql<number>`count(*)` }).from(contactSubmissions);
//     const [pendingCount] = await db
//       .select({ count: sql<number>`count(*)` })
//       .from(contactSubmissions)
//       .where(sql`${contactSubmissions.status} = 'pending'`);

//     return {
//       notices: Number(noticeCount.count) || 0,
//       materials: Number(materialCount.count) || 0,
//       contacts: Number(contactCount.count) || 0,
//       pending: Number(pendingCount.count) || 0,
//     };
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     return {
//       notices: 0,
//       materials: 0,
//       contacts: 0,
//       pending: 0,
//     };
//   }
// }

// export default async function AdminDashboard() {
//   const stats = await getStats();

//   return (
//     <div>
//       <h1
//         className="text-4xl font-bold mb-8"
//         style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
//       >
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
//                 Total Notices
//               </p>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: '#0B5FFF', fontFamily: 'Inter, sans-serif' }}
//               >
//                 {stats.notices}
//               </h3>
//             </div>
//             <div className="text-4xl">📢</div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
//                 Study Materials
//               </p>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: '#0B5FFF', fontFamily: 'Inter, sans-serif' }}
//               >
//                 {stats.materials}
//               </h3>
//             </div>
//             <div className="text-4xl">📚</div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
//                 Contact Submissions
//               </p>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: '#0B5FFF', fontFamily: 'Inter, sans-serif' }}
//               >
//                 {stats.contacts}
//               </h3>
//             </div>
//             <div className="text-4xl">📧</div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
//                 Pending Contacts
//               </p>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: '#FFB703', fontFamily: 'Inter, sans-serif' }}
//               >
//                 {stats.pending}
//               </h3>
//             </div>
//             <div className="text-4xl">⏳</div>
//           </div>
//         </Card>
//       </div>

//       <Card>
//         <h2
//           className="text-2xl font-bold mb-4"
//           style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
//         >
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <a
//             href="/admin/notices"
//             className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
//           >
//             <div className="text-3xl mb-2">➕</div>
//             <p className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
//               Add New Notice
//             </p>
//           </a>
//           <a
//             href="/admin/study-materials"
//             className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
//           >
//             <div className="text-3xl mb-2">📤</div>
//             <p className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
//               Upload Study Material
//             </p>
//           </a>
//           <a
//             href="/admin/contacts"
//             className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
//           >
//             <div className="text-3xl mb-2">👁️</div>
//             <p className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
//               View Contact Submissions
//             </p>
//           </a>
//         </div>
//       </Card>
//     </div>
//   );
// }
