'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GLOBE_SIZE = 450;
const GLOBE_RADIUS = GLOBE_SIZE / 2;
const MAP_CIRCUMFERENCE = 2 * Math.PI * GLOBE_RADIUS;

interface HeroProps {
    appUrl: string;
}

const CustomTechEarth = () => {
    const [rotation, setRotation] = useState(0);
    const requestRef = useRef<number | null>(null);

    const animate = () => {
        setRotation((prev) => prev + 0.002);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const rotationRatio = (rotation % (2 * Math.PI)) / (2 * Math.PI);
    const bgPosition = rotationRatio * MAP_CIRCUMFERENCE;

    return (
        <div
            className="relative flex items-center justify-center aspect-square w-full max-w-[450px] md:max-w-[500px] transform scale-90 md:scale-100 transition-transform duration-500"
        >
            <div className="absolute inset-0 rounded-full bg-[#0EA5E9] overflow-hidden border border-slate-200/60">
                <div
                    className="absolute top-0 left-0 h-full opacity-55"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage:
                            "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                        backgroundSize: `${MAP_CIRCUMFERENCE}px 100%`,
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: `${-bgPosition}px center`,
                        filter: 'saturate(1.2)',
                    }}
                ></div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[45px_45px] rounded-full opacity-20"></div>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_60%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
            </div>

            <div className="absolute inset-[-2px] rounded-full border border-blue-500/30 blur-[1px]"></div>
            <div className="absolute inset-[-30px] rounded-full bg-blue-500/10 blur-2xl -z-10"></div>
        </div>
    );
};

export const HeroSection: React.FC<HeroProps> = ({ appUrl }) => {
    return (
        <section className="relative pt-15 pb-10 px-6 lg:h-screen min-h-[800px] flex items-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white via-blue-50 to-indigo-100 -z-20"></div>
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[160px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full sm:px-6 py-10 flex flex-col sm:grid lg:grid-cols-2 gap-10 items-center h-full">
                <div className="space-y-2 z-10">
                    <Badge
                        variant="outline"
                        className="bg-red-100 text-red-600 border-red-200 font-semibold uppercase tracking-wider px-3 "
                    >
                        Global Monitoring
                    </Badge>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                        Bản đồ cảnh báo tội phạm
                    </h1>

                    <p className="text-slate-600 text-base sm:text-lg  max-w-lg leading-relaxed">
                        GuardM không chỉ là landing page demo, mà là bộ ứng dụng hoàn chỉnh gồm
                        dashboard thống kê, bản đồ tội phạm, báo cáo người dân, danh sách truy nã
                        và cảnh báo thời tiết được kết nối với dữ liệu thật.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="text-base font-semibold shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                        >
                            <a href={appUrl} className="flex items-center gap-2">
                                Truy cập ứng dụng
                                <ChevronRight className="w-5 h-5" />
                            </a>
                        </Button>

                    </div>
                </div>

                <div id="demo" className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-1000">
                    <CustomTechEarth />
                </div>
            </div>
        </section>
    );
}


