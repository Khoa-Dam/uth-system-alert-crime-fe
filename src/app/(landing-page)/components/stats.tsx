'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
    { value: 'Real‑time', label: 'Dashboard thống kê' },
    { value: 'Bản đồ', label: 'Heatmap & marker tội phạm' },
    { value: 'Truy nã', label: 'Đồng bộ dữ liệu thật' },
    { value: 'Weather', label: 'Cảnh báo thiên tai' },
];

export const StatsSection: React.FC = () => {
    return (
        <section className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card
                        key={stat.label}
                        className="bg-white border-slate-200 text-center shadow-sm"
                    >
                        <CardHeader className="space-y-1 pb-2">
                            <CardTitle className="text-[18px] sm:text-3xl md:text-4xl text-slate-900">
                                {stat.value}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-[12px] sm:text-sm text-slate-500 font-medium uppercase tracking-widest">
                            {stat.label}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};


