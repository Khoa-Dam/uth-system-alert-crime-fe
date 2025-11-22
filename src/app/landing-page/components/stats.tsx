"use client";

import { AlertTriangle, MapPin, Users, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
    {
        icon: AlertTriangle,
        value: "1000+",
        label: "Báo cáo",
        description: "Báo cáo tội phạm đã được gửi",
    },
    {
        icon: MapPin,
        value: "63",
        label: "Tỉnh/Thành",
        description: "Phủ sóng toàn quốc",
    },
    {
        icon: Users,
        value: "5000+",
        label: "Người dùng",
        description: "Cộng đồng đang sử dụng",
    },
    {
        icon: FileText,
        value: "500+",
        label: "Truy nã",
        description: "Đối tượng trong danh sách",
    },
];

export function Stats() {
    return (
        <section id="stats" className="border-y bg-amber-50/50 dark:bg-amber-950/20 py-12">
            <div className="container mx-auto">
                <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="border-0 bg-background/80 backdrop-blur-sm shadow-sm">
                                <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                                    <div className="rounded-full bg-amber-100 dark:bg-amber-950/50 p-3">
                                        <Icon className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                                    </div>
                                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{stat.value}</div>
                                    <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
                                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

