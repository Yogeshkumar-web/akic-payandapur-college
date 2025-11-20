'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NoticeCard from '@/components/NoticeCard';
import { Notice } from '@/db/schema';

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Academic', 'Events', 'Holidays', 'General'];

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.category === selectedCategory));
    }
  }, [selectedCategory, notices]);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
        setFilteredNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Cork Board Background */}
      <main 
        className="min-h-screen py-16 relative"
        style={{
          background: 'linear-gradient(135deg, #8B7355 0%, #6B5444 100%)',
        }}
      >
        {/* Wood texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Header with cork board style */}
          <div className="mb-8 text-center">
            <div className="inline-block relative">
              <h1
                className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                📌 Notice Board
              </h1>
              <p
                className="text-lg text-amber-100 drop-shadow-md"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Stay updated with the latest announcements and events
              </p>
            </div>
          </div>

          {/* Category Filter - styled like wooden tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg ${
                  selectedCategory === category
                    ? 'text-white scale-105'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
                style={
                  selectedCategory === category
                    ? { 
                        backgroundColor: '#0B5FFF',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                      }
                    : {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cork Board Container */}
          <div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl relative"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.3)',
            }}
          >
            {/* Cork texture overlay */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='25' r='1.5'/%3E%3Ccircle cx='50' cy='15' r='2.5'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='90' cy='20' r='2'/%3E%3Ccircle cx='20' cy='50' r='1.5'/%3E%3Ccircle cx='40' cy='60' r='2'/%3E%3Ccircle cx='60' cy='55' r='1.5'/%3E%3Ccircle cx='80' cy='65' r='2.5'/%3E%3Ccircle cx='15' cy='85' r='2'/%3E%3Ccircle cx='35' cy='90' r='1'/%3E%3Ccircle cx='55' cy='95' r='1.5'/%3E%3Ccircle cx='75' cy='88' r='2'/%3E%3Ccircle cx='95' cy='92' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Notices Grid */}
            <div className="relative z-10">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
                  <p className="mt-6 text-white text-lg font-medium drop-shadow-md" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Loading notices...
                  </p>
                </div>
              ) : filteredNotices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNotices.map((notice, index) => (
                    <NoticeCard key={notice.id} notice={notice} index={index} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center transform hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">📭</div>
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    No Notices Found
                  </h3>
                  <p className="text-gray-600 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {selectedCategory === 'All'
                      ? 'The board is empty right now. Check back later!'
                      : `No notices in the ${selectedCategory} category.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
