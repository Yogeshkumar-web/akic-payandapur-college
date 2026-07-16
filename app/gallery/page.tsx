import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import MotionReveal from '@/components/MotionReveal';

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
      <main className="min-h-screen bg-white">
        <section className="page-heading text-center">
        <div className="site-container">
          <MotionReveal>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Inter, sans-serif', color: '#2B1717' }}
            >
              Photo Gallery
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Glimpses of our college campus, facilities, and student life
            </p>
          </MotionReveal>
        </div>
        </section>
        <div className="site-container py-10 md:py-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <MotionReveal
                key={index}
                delay={(index % 3) * 0.06}
                className="group overflow-hidden rounded-2xl border border-[#EADFD2] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(95,15,26,0.12)]"
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
                  <span className="mb-2 inline-block text-xs font-extrabold uppercase tracking-[0.08em] text-[#C62828]">
                    {image.category}
                  </span>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {image.title}
                  </h3>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

