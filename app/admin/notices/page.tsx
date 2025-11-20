'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Notice } from '@/db/schema';

// Category color mapping for sticky notes
const categoryColors: Record<string, string> = {
  General: 'bg-yellow-100 border-yellow-200 text-yellow-900',
  Academic: 'bg-blue-100 border-blue-200 text-blue-900',
  Events: 'bg-green-100 border-green-200 text-green-900',
  Holidays: 'bg-red-100 border-red-200 text-red-900',
};

const categoryBadges: Record<string, string> = {
  General: 'bg-yellow-200 text-yellow-800',
  Academic: 'bg-blue-200 text-blue-800',
  Events: 'bg-green-200 text-green-800',
  Holidays: 'bg-red-200 text-red-800',
};

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-amber-50/50 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1
            className="text-4xl font-bold text-slate-900"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Notice Board
          </h1>
          <p className="text-slate-500 mt-1">Manage and pin important announcements</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          {showForm ? 'Cancel' : '📌 Pin New Notice'}
        </Button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
          <Card className="border-t-4 border-t-blue-500 shadow-xl">
            <h2
              className="text-2xl font-bold mb-6 text-slate-800"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {editingNotice ? '✏️ Edit Notice' : '📝 New Notice'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="title"
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter notice title"
                className="bg-slate-50"
              />

              <Textarea
                id="content"
                label="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={5}
                placeholder="Enter notice content"
                className="bg-slate-50"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 bg-slate-50 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                  className="bg-slate-50"
                />
              </div>

              <div className="flex space-x-4 pt-4 border-t border-slate-100">
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? 'Saving...' : editingNotice ? 'Update Notice' : 'Pin to Board'}
                </Button>
                {editingNotice && (
                  <Button type="button" variant="secondary" onClick={resetForm} className="w-full md:w-auto">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Notice Board Grid */}
      {loading && !showForm ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : notices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              className={`relative group p-6 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:rotate-0 ${
                categoryColors[notice.category] || categoryColors.General
              }`}
              style={{
                transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
              }}
            >
              {/* Pin Visual */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-600 z-10"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-black/20 blur-[1px]"></div>

              {/* Date Badge */}
              <div className="absolute top-4 right-4 text-xs font-mono opacity-60 font-semibold">
                {new Date(notice.date).toLocaleDateString('en-IN')}
              </div>

              {/* Category Badge */}
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${categoryBadges[notice.category] || categoryBadges.General}`}>
                {notice.category.toUpperCase()}
              </span>

              <h3 className="text-xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                {notice.title}
              </h3>
              
              <p className="text-sm mb-12 whitespace-pre-wrap leading-relaxed opacity-90">
                {notice.content}
              </p>

              {/* Actions Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleEdit(notice)}
                  className="text-sm font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-sm font-semibold text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-xl text-slate-500 font-medium">The notice board is empty.</p>
          <p className="text-slate-400 mt-2">Click "Pin New Notice" to add one.</p>
        </div>
      )}
    </div>
  );
}

