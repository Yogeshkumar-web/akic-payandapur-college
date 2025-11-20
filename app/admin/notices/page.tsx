'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Notice } from '@/db/schema';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingNotice ? '/api/notices' : '/api/notices';
      const method = editingNotice ? 'PUT' : 'POST';
      const body = editingNotice
        ? { ...formData, id: editingNotice.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchNotices();
        resetForm();
      } else {
        alert('Failed to save notice');
      }
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/notices?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNotices();
      } else {
        alert('Failed to delete notice');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      date: new Date(notice.date).toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingNotice(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
        >
          Manage Notices
        </h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Notice'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
          >
            {editingNotice ? 'Edit Notice' : 'Create New Notice'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="title"
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter notice title"
            />

            <Textarea
              id="content"
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={5}
              placeholder="Enter notice content"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Events">Events</option>
                  <option value="Holidays">Holidays</option>
                </select>
              </div>

              <Input
                id="date"
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingNotice ? 'Update Notice' : 'Create Notice'}
              </Button>
              {editingNotice && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      <Card>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
        >
          All Notices
        </h2>

        {loading && !showForm ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : notices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{notice.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {notice.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(notice.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
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
          <p className="text-center text-gray-600 py-8">No notices found.</p>
        )}
      </Card>
    </div>
  );
}

