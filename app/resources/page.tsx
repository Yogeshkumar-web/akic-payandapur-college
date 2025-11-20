'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaterialCard from '@/components/MaterialCard';
import Tabs from '@/components/ui/Tabs';
import { StudyMaterial } from '@/db/schema';

export default function ResourcesPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/study-materials');
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error fetching study materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMaterialsByClass = (classValue: string) => {
    return materials.filter((material) => material.class === classValue);
  };

  const renderMaterialsList = (classValue: string) => {
    const classMaterials = getMaterialsByClass(classValue);

    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Loading materials...
          </p>
        </div>
      );
    }

    if (classMaterials.length === 0) {
      return (
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
            No Materials Available
          </h3>
          <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Study materials for Class {classValue} will be uploaded soon.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {classMaterials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    );
  };

  const tabs = [
    { id: '9', label: 'Class 9', content: renderMaterialsList('9') },
    { id: '10', label: 'Class 10', content: renderMaterialsList('10') },
    { id: '11', label: 'Class 11', content: renderMaterialsList('11') },
    { id: '12', label: 'Class 12', content: renderMaterialsList('12') },
  ];

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
              Study Resources
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Download study materials, notes, and resources for your class.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

