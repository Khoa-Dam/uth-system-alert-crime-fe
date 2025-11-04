import React from 'react';
import { Card } from '../ui/card';
import Link from 'next/link';

interface Report {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'completed';
  date: string;
  location: string;
  type: string;
}

const ReportList: React.FC = () => {
  // Sample data - replace with actual data from your API
  const reports: Report[] = [
    {
      id: '1',
      title: 'Báo cáo vụ việc đáng ngờ',
      status: 'pending',
      date: '2025-11-04',
      location: 'Quận 1, TP.HCM',
      type: 'Trộm cắp',
    },
    {
      id: '2',
      title: 'Báo cáo tình huống khẩn cấp',
      status: 'approved',
      date: '2025-11-03',
      location: 'Quận 2, TP.HCM',
      type: 'Gây rối trật tự',
    },
    {
      id: '3',
      title: 'Phát hiện đối tượng khả nghi',
      status: 'completed',
      date: '2025-11-02',
      location: 'Quận 3, TP.HCM',
      type: 'Ma túy',
    },
  ];

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'Đang xác minh';
      case 'approved':
        return 'Đã duyệt';
      case 'completed':
        return 'Đã xử lý';
      default:
        return status;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Danh sách báo cáo đã gửi</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="p-4 hover:shadow-lg transition-shadow">
            <Link href={`/reports/${report.id}`}>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-600">{report.location}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Loại: </span>
                    {report.type}
                  </p>
                  <p className="text-sm text-gray-500">{report.date}</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors mt-2">
                  Xem chi tiết →
                </button>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportList;