import React from 'react';
import { Card } from '../ui/card';

interface Reporter {
  id: string;
  name: string;
  rank: number;
  points: number;
  reportsCount: number;
  avatar?: string;
}

const ReporterRanking: React.FC = () => {
  // Sample data - replace with actual data from your API
  const reporters: Reporter[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      rank: 2,
      points: 1250,
      reportsCount: 25,
    },
    {
      id: '1',
      name: 'Nguyễn Văn A',
      rank: 3,
      points: 1250,
      reportsCount: 25,
    },
    {
      id: '1',
      name: 'Nguyễn Văn A',
      rank: 4,
      points: 1250,
      reportsCount: 25,
    }
    // Add more sample reporters here
  ];

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400';
      case 2:
        return 'bg-gray-300';
      case 3:
        return 'bg-amber-600';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Xếp hạng người báo cáo tích cực</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reporters.map((reporter) => (
          <Card key={reporter.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(reporter.rank)} text-white font-bold`}>
                #{reporter.rank}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{reporter.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{reporter.points} điểm</span>
                  <span>{reporter.reportsCount} báo cáo</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReporterRanking;