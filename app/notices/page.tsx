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
      <main className="min-h-screen py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
            >
              Notice Board
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Stay updated with the latest announcements, events, and important information.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={
                  selectedCategory === category
                    ? { backgroundColor: '#0B5FFF' }
                    : undefined
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Notices Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Loading notices...
              </p>
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3
                className="text-xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                No Notices Found
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {selectedCategory === 'All'
                  ? 'There are no notices at the moment. Check back later!'
                  : `No notices in the ${selectedCategory} category.`}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

