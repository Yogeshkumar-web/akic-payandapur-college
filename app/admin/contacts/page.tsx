'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { ContactSubmission } from '@/db/schema';

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        await fetchSubmissions();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
      >
        Contact Submissions
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <Card>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
            >
              All Submissions
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedSubmission?.id === submission.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{submission.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{submission.email}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{submission.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(submission.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No submissions found.</p>
            )}
          </Card>
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-1">
          {selectedSubmission ? (
            <Card className="sticky top-8">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
              >
                Submission Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Name
                  </label>
                  <p className="text-gray-900 font-medium">{selectedSubmission.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Email
                  </label>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedSubmission.email}
                  </a>
                </div>

                {selectedSubmission.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">
                      Phone
                    </label>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Message
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Submitted On
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedSubmission.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Status
                  </label>
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) =>
                      handleStatusChange(selectedSubmission.id, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="sticky top-8">
              <div className="text-center py-12">
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
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Select a submission to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

