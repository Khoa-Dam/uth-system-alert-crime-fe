'use client';

import React from 'react';
import { MapPin, FilePlus, Users, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featureHighlights = [
    {
        icon: <MapPin className="w-8 h-8 text-blue-500" />,
        title: 'Bản đồ sự cố thời gian thực',
        desc: 'Trang hiển thị marker tội phạm theo mức độ nguy hiểm, lọc theo severity, focus trực tiếp từ trang báo cáo.',
    },
    {
        icon: <FilePlus className="w-8 h-8 text-orange-500" />,
        title: 'Báo cáo & quản lý vụ việc',
        desc: 'Form gửi/chỉnh sửa báo cáo có ghim vị trí, reverse geocoding, xem chi tiết trong ReportCard và quản lý “Báo cáo của tôi”.',
    },
    {
        icon: <Users className="w-8 h-8 text-emerald-500" />,
        title: 'Thống kê & phân tích',
        desc: 'Dashboard thống kê theo loại tội phạm, quận/huyện, mức độ cảnh báo, chia nhỏ theo card Shadcn UI.',
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
        title: 'Truy nã & cảnh báo thời tiết',
        desc: 'Trang đọc API truy nã, trang hiển thị tin thiên tai/khí tượng kèm ảnh, thời gian cập nhật và nguồn chính thống.',
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <Badge
                        variant="outline"
                        className="mx-auto w-fit border-red-200 text-red-600 bg-red-50"
                    >
                        Hệ sinh thái bảo mật
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                        Công nghệ bảo vệ tiên tiến nhất hiện nay
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Kết hợp dữ liệu cộng đồng, AI và hạ tầng thời gian thực để cảnh
                        báo chính xác mọi lúc mọi nơi.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featureHighlights.map((feat) => (
                        <FeatureCard
                            key={feat.title}
                            icon={feat.icon}
                            title={feat.title}
                            desc={feat.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

function FeatureCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <Card className="group bg-white border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader className="space-y-4">
                <div className="inline-flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-transform group-hover:scale-105">
                    {icon}
                </div>
                <CardTitle className="text-slate-900 text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-sm leading-relaxed">
                {desc}
            </CardContent>
        </Card>
    );
}


