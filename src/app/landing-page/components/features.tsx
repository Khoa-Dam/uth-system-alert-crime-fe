"use client";

import { MapPinned, MessageSquareWarning, BarChart3, BookUser, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    icon: BookUser,
    title: "Tra cứu tội phạm truy nã",
    description: "Tìm kiếm và tra cứu thông tin các đối tượng truy nã trên toàn quốc. Cập nhật danh sách mới nhất từ cơ quan chức năng.",
    link: "/dashboard",
  },
  {
    icon: MessageSquareWarning,
    title: "Báo cáo tội phạm",
    description: "Báo cáo các sự cố, hành vi đáng ngờ hoặc tội phạm bạn chứng kiến. Hỗ trợ đăng kèm hình ảnh và mô tả chi tiết.",
    link: "/reports",
  },
  {
    icon: MapPinned,
    title: "Bản đồ cảnh báo",
    description: "Xem bản đồ trực quan với các điểm cảnh báo tội phạm. Nhận cảnh báo khi đến gần khu vực nguy hiểm.",
    link: "/map",
  },
  {
    icon: BarChart3,
    title: "Thống kê & Phân tích",
    description: "Xem thống kê chi tiết về tình hình tội phạm theo khu vực, loại tội phạm và xu hướng theo thời gian.",
    link: "/dashboard",
  },
  {
    icon: Bell,
    title: "Cảnh báo gần đây",
    description: "Nhận thông báo cảnh báo khi bạn ở gần khu vực có báo cáo tội phạm. Bảo vệ bạn và người thân.",
    link: "/map",
  },
  {
    icon: Shield,
    title: "Bảo mật & An toàn",
    description: "Thông tin được mã hóa và bảo mật. Hỗ trợ báo cáo ẩn danh để bảo vệ người tố giác.",
    link: "/reports",
  },
];

export function Features() {
  return (
    <section id="features" className="space-y-12 p-5">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Tính năng bảo vệ cộng đồng
        </h2>
        <p className="max-w-[85%] text-lg text-muted-foreground">
          Các công cụ mạnh mẽ giúp bạn tra cứu, báo cáo và nhận cảnh báo về tội phạm
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link key={i} href={feature.link}>
              <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-amber-600 hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-amber-100 dark:bg-amber-950/50 p-3">
                    <Icon className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
