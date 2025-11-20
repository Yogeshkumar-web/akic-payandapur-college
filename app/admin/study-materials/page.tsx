'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { StudyMaterial } from '@/db/schema';

export default function AdminStudyMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '9',
    subject: '',
  });

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
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      console.log('Authentication status:', data);
      alert(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error checking auth:', error);
      alert('Error checking authentication');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      alert('File size exceeds 10MB limit. Please select a smaller file.');
      return;
    }

    setUploading(true);

    try {
      // Upload file
      const fileFormData = new FormData();
      fileFormData.append('file', selectedFile);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: fileFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      const { fileUrl } = await uploadResponse.json();

      // Create material record
      const materialResponse = await fetch('/api/study-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fileUrl,
        }),
      });

      if (materialResponse.ok) {
        await fetchMaterials();
        resetForm();
        alert('Study material uploaded successfully!');
      } else {
        const errorData = await materialResponse.json();
        alert(errorData.error || 'Failed to save material');
      }
    } catch (error) {
      console.error('Error uploading material:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while uploading';
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/study-materials?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMaterials();
      } else {
        alert('Failed to delete material');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      class: '9',
      subject: '',
    });
    setSelectedFile(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
        >
          Manage Study Materials
        </h1>
        <div className="flex gap-2">
          {/* <Button onClick={checkAuth} variant="secondary">
            Check Auth
          </Button> */}
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Upload New Material'}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
          >
            Upload Study Material
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="title"
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Chapter 1 - Mathematics Notes"
            />

            <Textarea
              id="description"
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Brief description of the material"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Class
                </label>
                <select
                  id="class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>

              <Input
                id="subject"
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                File (PDF, DOC, DOCX, PPT, PPTX)
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                required
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Material'}
            </Button>
          </form>
        </Card>
      )}

      <Card>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
        >
          All Study Materials
        </h2>

        {loading && !showForm ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : materials.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Class</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Uploaded</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{material.title}</td>
                    <td className="py-3 px-4 text-gray-700">Class {material.class}</td>
                    <td className="py-3 px-4 text-gray-700">{material.subject}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(material.uploadedAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">No study materials found.</p>
        )}
      </Card>
    </div>
  );
}

