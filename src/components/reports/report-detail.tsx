import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';

interface ReportDetail {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  location: string;
  reporter: {
    name: string;
    points: number;
  };
  images?: string[];
  category: string;
  severity: 'low' | 'medium' | 'high';
}

const ReportDetail: React.FC = () => {
  // Sample data - replace with actual data from your API
  const report: ReportDetail = {
    id: '1',
    title: 'Suspicious Activity Report',
    description: 'Chi tiết về sự việc đáng ngờ tại khu vực...',
    status: 'pending',
    date: '2025-11-04',
    location: 'District 1, Ho Chi Minh City',
    reporter: {
      name: 'Nguyễn Văn A',
      points: 1250,
    },
    category: 'An ninh trật tự',
    severity: 'medium',
  };

  const getSeverityColor = (severity: ReportDetail['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{report.date}</span>
                <span>•</span>
                <span>{report.category}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(report.severity)}`}>
              {report.severity}
            </span>
          </div>

          {/* Location */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Địa điểm</h2>
            <p className="text-gray-700">{report.location}</p>
          </div>

          {/* Description */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Chi tiết báo cáo</h2>
            <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
          </div>

          {/* Images */}
          {report.images && report.images.length > 0 && (
            <div className="border-t pt-4">
              <h2 className="font-semibold mb-2">Hình ảnh</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {report.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`Report image ${index + 1}`} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reporter Info */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Người báo cáo</h2>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">{report.reporter.name}</p>
                <p className="text-sm text-gray-600">{report.reporter.points} điểm</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportDetail;