import { Notice } from '@/db/schema';

interface NoticeCardProps {
  notice: Notice;
  index?: number;
}

export default function NoticeCard({ notice, index = 0 }: NoticeCardProps) {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    Academic: { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
    Events: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
    Holidays: { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
    General: { bg: '#F3F4F6', text: '#374151', border: '#6B7280' },
  };

  const colors = categoryColors[notice.category] || categoryColors.General;

  // Random slight rotation for realistic pinned paper effect
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
  const rotation = rotations[index % rotations.length];

  // Different paper colors for variety
  const paperColors = [
    '#FFFEF7', // Cream
    '#FFF9E6', // Light yellow
    '#F0F9FF', // Light blue
    '#FFF1F2', // Light pink
    '#F0FDF4', // Light green
  ];
  const paperColor = paperColors[index % paperColors.length];

  return (
    <div className={`relative group ${rotation} transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10`}>
      {/* Push Pin */}
      <div 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
        }}
      >
        <div 
          className="w-6 h-6 rounded-full relative"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.border}, ${colors.text})`,
            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Pin needle */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            style={{
              width: '2px',
              height: '8px',
              background: 'linear-gradient(to bottom, #888, #666)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Paper Note */}
      <div
        className="rounded-lg shadow-lg p-6 relative overflow-hidden"
        style={{
          backgroundColor: paperColor,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Tape effect at top */}
        <div 
          className="absolute -top-2 left-1/4 w-16 h-6 opacity-40"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(200,200,200,0.6))',
            transform: 'rotate(-2deg)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Category Badge and Date */}
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `2px solid ${colors.border}`,
              }}
            >
              {notice.category}
            </span>
            <div className="text-right">
              <div 
                className="text-xs font-semibold px-2 py-1 rounded"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: '#374151',
                }}
              >
                {new Date(notice.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {new Date(notice.date).getFullYear()}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 
            className="text-xl font-bold text-gray-900 mb-3 leading-tight" 
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            {notice.title}
          </h3>

          {/* Content */}
          <p 
            className="text-gray-700 leading-relaxed text-sm" 
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {notice.content}
          </p>

          {/* Attachment Link */}
          {notice.attachmentUrl && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <a
                href={notice.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Attachment
              </a>
            </div>
          )}

          {/* Decorative corner fold */}
          <div 
            className="absolute bottom-0 right-0 w-0 h-0"
            style={{
              borderLeft: '20px solid transparent',
              borderBottom: `20px solid ${paperColor}`,
              filter: 'brightness(0.9)',
              opacity: 0.5,
            }}
          />
        </div>

        {/* Shadow under paper */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'rgba(0,0,0,0.1)',
            filter: 'blur(8px)',
            transform: 'translateY(4px)',
          }}
        />
      </div>
    </div>
  );
}
