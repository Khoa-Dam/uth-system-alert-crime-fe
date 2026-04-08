'use client';

import React from 'react';
import { MapPin, FilePlus, BarChart3, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: MapPin, color: '#00d4ff', label: 'LIVE',
    title: 'Bản đồ sự cố thời gian thực',
    desc: 'Marker tội phạm theo mức độ nguy hiểm, lọc theo severity, focus trực tiếp từ trang báo cáo. Dark tile + heatmap trực quan.',
  },
  {
    icon: FilePlus, color: '#ffd700', label: 'REPORT',
    title: 'Báo cáo & quản lý vụ việc',
    desc: 'Multi-step wizard gửi/chỉnh sửa báo cáo, ghim vị trí, reverse geocoding, xem chi tiết trong ReportCard.',
  },
  {
    icon: BarChart3, color: '#ff3b3b', label: 'STATS',
    title: 'Thống kê & phân tích',
    desc: 'Dashboard thống kê theo loại tội phạm, quận/huyện, mức độ cảnh báo. Charts PieChart + BarChart real-time.',
  },
  {
    icon: ShieldCheck, color: '#00ff88', label: 'DATA',
    title: 'Truy nã & cảnh báo thời tiết',
    desc: 'API truy nã từ Bộ Công An, tin thiên tai/khí tượng kèm ảnh, thời gian cập nhật và nguồn chính thống.',
  },
];

export const FeaturesSection: React.FC = () => (
  <section id="features" className="py-24 px-6 relative">
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 70%)' }} />

    <div className="max-w-6xl mx-auto relative">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded border border-[rgba(255,59,59,0.25)] bg-[rgba(255,59,59,0.06)] text-[#ff3b3b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b3b] animate-pulse" />
          Hệ sinh thái bảo mật
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold text-white leading-tight">
          CÔNG NGHỆ BẢO VỆ<br />
          <span style={{ color: '#00d4ff' }}>TIÊN TIẾN NHẤT</span>
        </h2>
        <p className="font-mono text-sm text-[#8899aa] max-w-xl mx-auto leading-relaxed">
          Kết hợp dữ liệu cộng đồng và hạ tầng thời gian thực để cảnh báo chính xác mọi lúc mọi nơi.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, color, label, title, desc }) => (
          <div key={title}
            className="group relative rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(12,17,32,0.7)] backdrop-blur-sm p-5 overflow-hidden hover:border-opacity-40 transition-all duration-300"
            style={{ '--hover-color': color } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at top left, ${color}06, transparent 60%)` }} />
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

            <div className="mb-4 flex items-start justify-between">
              <div className="p-2 rounded border" style={{ borderColor: `${color}30`, background: `${color}10` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="font-mono text-[8px] tracking-widest" style={{ color: `${color}80` }}>{label}</span>
            </div>

            <h3 className="font-mono text-sm font-bold text-white mb-2 leading-tight">{title}</h3>
            <p className="font-mono text-[11px] text-[#8899aa] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
