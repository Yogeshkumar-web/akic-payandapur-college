import { Notice } from '@/db/schema';
import Card from './ui/Card';

interface NoticeCardProps {
  notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  const categoryColors: Record<string, string> = {
    Academic: 'bg-blue-100 text-blue-800',
    Events: 'bg-green-100 text-green-800',
    Holidays: 'bg-yellow-100 text-yellow-800',
    General: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            categoryColors[notice.category] || categoryColors.General
          }`}
        >
          {notice.category}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(notice.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
        {notice.title}
      </h3>
      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {notice.content}
      </p>
    </Card>
  );
}

