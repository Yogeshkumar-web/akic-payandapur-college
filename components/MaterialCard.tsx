import { StudyMaterial } from '@/db/schema';
import Card from './ui/Card';

interface MaterialCardProps {
  material: StudyMaterial;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {material.title}
          </h3>
          {material.description && (
            <p className="text-gray-700 text-sm mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {material.description}
            </p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="font-medium">Class {material.class}</span>
            <span>•</span>
            <span>{material.subject}</span>
          </div>
        </div>
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 text-white rounded-lg hover:opacity-90 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ backgroundColor: '#0B5FFF' }}
        >
          Download
        </a>
      </div>
    </Card>
  );
}

