import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function GalleryPage() {
  const images = [
    { src: '/college_middle_view.jpg', title: 'College Campus View', category: 'Campus' },
    { src: '/college_gate.jpg', title: 'College Main Gate', category: 'Campus' },
    { src: '/college_parking.jpg', title: 'College Parking Area', category: 'Facilities' },
    { src: '/college_rooms.jpg', title: 'Classroom Facilities', category: 'Academic' },
    { src: '/group_photo.jpg', title: 'Students Group Photo', category: 'Students' },
    { src: '/portrait_college_rooms.jpg', title: 'College Building', category: 'Campus' },
    { src: '/portrait_gate.jpg', title: 'College Entrance', category: 'Campus' },
    { src: '/portrait_ma_sarashwati.jpg', title: 'Ma Saraswati', category: 'Cultural' },
    { src: '/portrait_middle_college.jpg', title: 'College Front View', category: 'Campus' },
    { src: '/portrait_students.jpg', title: 'Student Activities', category: 'Students' },
    { src: '/principle_image.jpg', title: 'Principal Office', category: 'Administration' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
            >
              Photo Gallery
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Glimpses of our college campus, facilities, and student life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2"
                    style={{ backgroundColor: '#0B5FFF', color: 'white' }}
                  >
                    {image.category}
                  </span>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

