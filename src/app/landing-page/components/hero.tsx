"use client";

import { ArrowRight, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted/20" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]" />

      <div className="container mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div className="group relative inline-flex items-center gap-2 rounded-full border bg-amber-50 dark:bg-amber-950/50 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:scale-105">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          <span className="font-medium text-amber-800 dark:text-amber-200">Hệ thống cảnh báo tội phạm toàn quốc</span>
        </div>

        <h1 className="font-merriweather text-5xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Hệ thống cảnh báo tội phạm
          <br />
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Hệ thống tra cứu tội phạm truy nã và cảnh báo an toàn. Báo cáo sự cố, xem bản đồ cảnh báo,
          và tra cứu thông tin tội phạm để bảo vệ bạn và cộng đồng.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group gap-2 text-lg shadow-lg transition-all hover:scale-105 bg-amber-600 hover:bg-amber-700"
            )}
          >
            Tra cứu ngay
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "text-lg transition-all hover:scale-105"
            )}
          >
            Đăng ký tài khoản
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <span>Miễn phí sử dụng</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <span>Bảo mật thông tin</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <span>Cập nhật thời gian thực</span>
          </div>
        </div>
      </div>
    </section>
  );
}
