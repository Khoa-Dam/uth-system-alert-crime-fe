'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const SecuritySection: React.FC = () => {
    return (
        <section id="security" className="px-6 pb-24">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <Badge variant="secondary" className="w-fit bg-blue-50 text-blue-700">
                        Bảo mật lớp kép
                    </Badge>
                    <h3 className="text-3xl font-bold text-slate-900">
                        Hạ tầng được gia cố bằng chuẩn doanh nghiệp
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        GuardM mã hóa end-to-end dữ liệu định vị, áp dụng cơ chế phân
                        quyền chặt chẽ và lưu trữ trên nền tảng đạt chuẩn ISO/IEC 27001.
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            'Đăng nhập qua phiên NextAuth, không cho truy cập dashboard khi chưa xác thực',
                            'Phân quyền cơ bản theo vai trò người dùng (user / admin)',
                            'API phía server kiểm soát quyền truy cập cho chức năng báo cáo và truy nã',
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 text-sm text-slate-600"
                            >
                                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <Card className="bg-white border-slate-200 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Thông tin bảo mật hệ thống</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-slate-600">
                        <div className="flex justify-between text-sm">
                            <span>Phiên đăng nhập</span>
                            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                                NextAuth session
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm">
                            <span>Vùng được bảo vệ</span>
                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                Dashboard & bản đồ
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm">
                            <span>API nhạy cảm</span>
                            <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
                                Báo cáo & truy nã
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};


