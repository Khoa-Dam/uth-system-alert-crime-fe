'use client';

import { CrimeType } from '@/service/report.service';
import { CrimeReport } from '@/types/crime';
import React, { useEffect, useRef, useState, useMemo } from 'react';

// ==========================================
// PHẦN 1: TYPES & MOCK DATA
// ==========================================



const SAMPLE_DATA: CrimeReport[] = [
    {
        id: "uuid-1",
        title: "Cướp giật tại chợ Bến Thành",
        description: "Bị cướp giật điện thoại khi đang đứng đợi xe...",
        type: CrimeType.CuopGiat,
        lat: 10.7721,
        lng: 106.6983,
        address: "Chợ Bến Thành, Quận 1, TP.HCM",
        district: "Quận 1",
        province: "Hồ Chí Minh",
        status: 1,
        severity: 5,
        severityLevel: 'high',
        attachments: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ben_Thanh_Market_-_front_view.jpg/1200px-Ben_Thanh_Market_-_front_view.jpg"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "uuid-2",
        title: "Trộm xe máy tại Landmark 81",
        description: "Mất xe Wave Alpha màu đỏ biển số 59...",
        type: CrimeType.TromCap,
        lat: 10.7952,
        lng: 106.7218,
        address: "Landmark 81, Bình Thạnh",
        district: "Bình Thạnh",
        province: "Hồ Chí Minh",
        status: 1,
        severity: 3,
        severityLevel: 'medium',
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "uuid-3",
        title: "Móc túi phố đi bộ",
        description: "Lợi dụng đám đông chen lấn để móc ví...",
        type: CrimeType.TromCap,
        lat: 10.7745,
        lng: 106.7032,
        address: "Phố đi bộ Nguyễn Huệ, Quận 1",
        district: "Quận 1",
        province: "Hồ Chí Minh",
        status: 1,
        severity: 2,
        severityLevel: 'low',
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// ==========================================
// PHẦN 2: HOOKS
// ==========================================
const useLeaflet = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkLeafletReady = () => {
            const L = (window as any).L;
            if (L && typeof L.map === 'function') {
                setIsLoaded(true);
                return true;
            }
            return false;
        };

        if (checkLeafletReady()) return;

        const existingScript = document.getElementById('leaflet-script');
        if (existingScript) {
            existingScript.addEventListener('load', checkLeafletReady);
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const style = document.createElement('style');
        style.innerHTML = `
      .pulse-marker {
        display: block;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
        animation: pulse 2s infinite;
      }
      .pulse-marker:hover {
        animation: none;
        transform: scale(1.1);
        transition: transform 0.2s;
      }
      /* Marker Vị trí của tôi (Màu xanh dương) */
      .my-location-pulse {
        background-color: #3b82f6;
        border: 2px solid white;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
        animation: blue-pulse 2s infinite;
      }
      @keyframes blue-pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(var(--color-rgb), 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(var(--color-rgb), 0); }
        100% { box-shadow: 0 0 0 0 rgba(var(--color-rgb), 0); }
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 0;
        overflow: hidden;
      }
      .leaflet-popup-content {
        margin: 0;
        width: 280px !important;
      }
      .leaflet-popup-tip {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      @media (max-width: 640px) {
        .leaflet-popup-content { width: 240px !important; }
        .leaflet-control-zoom { display: none; }
      }
    `;
        document.head.appendChild(style);

        const script = document.createElement("script");
        script.id = 'leaflet-script';
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.crossOrigin = "";
        script.onload = checkLeafletReady;
        document.body.appendChild(script);
    }, []);

    return isLoaded;
};

// ==========================================
// PHẦN 3: MAIN COMPONENT
// ==========================================

type FilterType = 'all' | 'high_severity' | 'cuop_giat' | 'trom_cap';

const CrimeMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersLayerRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);

    const [reports, setReports] = useState<CrimeReport[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [hasLocated, setHasLocated] = useState(false);

    const isLeafletLoaded = useLeaflet();

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setReports(SAMPLE_DATA);
                setIsLoading(false);
            }, 1000);
        };
        fetchData();
    }, []);

    // Init Map
    useEffect(() => {
        if (!isLeafletLoaded || !mapContainerRef.current) return;
        if (mapInstanceRef.current) return;

        try {
            const L = (window as any).L;
            if (!L || typeof L.map !== 'function') return;

            const map = L.map(mapContainerRef.current, {
                zoomControl: false,
                tap: true
            }).setView([10.7769, 106.7009], 13);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);

            const markersLayer = L.layerGroup().addTo(map);
            markersLayerRef.current = markersLayer;
            mapInstanceRef.current = map;

        } catch (error) {
            console.error("Map Init Error:", error);
        }
    }, [isLeafletLoaded]);

    // Handle Location & Auto-Locate
    const handleGetLocation = () => {
        if (!navigator.geolocation) return alert("Trình duyệt không hỗ trợ định vị");

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const map = mapInstanceRef.current;
                const L = (window as any).L;

                if (map && L) {
                    if (userMarkerRef.current) {
                        map.removeLayer(userMarkerRef.current);
                    }

                    const myLocationIcon = L.divIcon({
                        className: 'custom-user-marker',
                        html: `<div class="my-location-pulse"></div>`,
                        iconSize: [20, 20],
                        iconAnchor: [10, 10],
                    });

                    const marker = L.marker([latitude, longitude], { icon: myLocationIcon }).addTo(map);
                    marker.bindPopup("<b>Vị trí hiện tại của bạn</b>");

                    userMarkerRef.current = marker;

                    map.flyTo([latitude, longitude], 15, { duration: 1.5 });
                    setHasLocated(true);
                }
            },
            (err) => {
                console.warn("Lỗi định vị:", err.message);
            }
        );
    };

    useEffect(() => {
        if (isLeafletLoaded && mapInstanceRef.current && !hasLocated) {
            handleGetLocation();
        }
    }, [isLeafletLoaded]);

    // Render Markers
    const filteredReports = useMemo(() => {
        return reports.filter(r => {
            if (filter === 'all') return true;
            if (filter === 'high_severity') return r.severityLevel === 'high';
            return r.type === filter;
        });
    }, [reports, filter]);

    useEffect(() => {
        const L = (window as any).L;
        if (!isLeafletLoaded || !mapInstanceRef.current || !markersLayerRef.current || !L) return;

        markersLayerRef.current.clearLayers();

        filteredReports.forEach((crime) => {
            if (!crime.lat || !crime.lng) return;

            let color = '#22c55e'; // Green
            let rgb = '34, 197, 94';
            let badgeClass = 'bg-green-100 text-green-700';
            let severityText = 'Cảnh báo';

            if (crime.severityLevel === 'medium') {
                color = '#eab308'; rgb = '234, 179, 8';
                badgeClass = 'bg-yellow-100 text-yellow-700';
            }
            if (crime.severityLevel === 'high') {
                color = '#ef4444'; rgb = '239, 68, 68';
                badgeClass = 'bg-red-100 text-red-700';
                severityText = 'Nguy hiểm';
            }

            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<span class="pulse-marker" style="
          background-color: ${color};
          width: 16px;
          height: 16px;
          border: 2px solid white;
          --color-rgb: ${rgb};
        "></span>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
            });

            const marker = L.marker([crime.lat, crime.lng], { icon: customIcon });

            const popupContent = `
        <div style="font-family: -apple-system, sans-serif;">
          ${(crime.attachments && crime.attachments.length > 0) ?
                    `<div style="width: 100%; height: 120px; background-image: url('${crime.attachments[0]}'); background-size: cover; background-position: center;"></div>`
                    : ''
                }
          <div style="padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 3px 6px; border-radius: 4px; background-color: ${crime.severityLevel === 'high' ? '#fee2e2' : '#fef9c3'}; color: ${crime.severityLevel === 'high' ? '#b91c1c' : '#a16207'};">
                ${severityText}
              </span>
              <span style="font-size: 10px; color: #6b7280;">${new Date(crime.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0; line-height: 1.3;">
              ${crime.title}
            </h3>
            <p style="font-size: 12px; color: #4b5563; margin-bottom: 8px; display: flex; align-items: start; gap: 4px;">
              <svg width="14" height="14" style="margin-top: 1px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${crime.address}</span>
            </p>
            ${crime.district ? `<p style="font-size: 11px; color: #6b7280; margin-top: -4px; margin-bottom: 8px; padding-left: 18px;">${crime.district}, ${crime.province || ''}</p>` : ''}
            <p style="font-size: 13px; color: #374151; background: #f9fafb; padding: 8px; border-radius: 6px; border: 1px solid #e5e7eb; margin: 0; line-height: 1.5;">
              "${crime.description}"
            </p>
          </div>
        </div>
      `;

            marker.bindPopup(popupContent, {
                closeButton: false,
                maxWidth: 280,
                minWidth: 200
            });

            markersLayerRef.current.addLayer(marker);
        });

    }, [filteredReports, isLeafletLoaded]);

    return (
        <div className="relative w-full h-[65vh] md:h-[600px] rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white font-sans transition-all duration-300">

            {(!isLeafletLoaded || isLoading) && (
                <div className="absolute inset-0 bg-white/90 z-[2000] flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-sm font-semibold text-gray-600">Đang tải bản đồ...</span>
                </div>
            )}

            {/* FILTER BAR */}
            <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>Tất cả</FilterBtn>
                <FilterBtn active={filter === 'high_severity'} onClick={() => setFilter('high_severity')} color="red">Nguy hiểm cao</FilterBtn>
                <FilterBtn active={filter === 'cuop_giat'} onClick={() => setFilter('cuop_giat')}>Cướp giật</FilterBtn>
                <FilterBtn active={filter === 'trom_cap'} onClick={() => setFilter('trom_cap')}>Trộm cắp</FilterBtn>
            </div>

            <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-50" />

            {/* LOCATION BUTTON */}
            <button
                onClick={handleGetLocation}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-4 z-[900] bg-white p-3 md:p-3.5 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 text-blue-600 border border-gray-100 flex items-center justify-center"
                title="Vị trí của tôi"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
            </button>
        </div>
    );
};

const FilterBtn = ({ children, active, onClick, color = 'blue' }: any) => {
    const baseStyle = "px-4 py-2 md:py-1.5 rounded-full text-sm font-medium transition-all shadow-sm border whitespace-nowrap snap-start flex-shrink-0 active:scale-95";
    const activeStyle = color === 'red'
        ? "bg-red-600 text-white border-red-600 shadow-red-200"
        : "bg-slate-800 text-white border-slate-800 shadow-slate-200";
    const inactiveStyle = "bg-white text-gray-600 border-gray-200 hover:bg-gray-50";

    return (
        <button onClick={onClick} className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}>
            {children}
        </button>
    );
};

export default CrimeMap;