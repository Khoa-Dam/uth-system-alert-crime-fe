'use client';

import { useEffect } from 'react';
import { VerificationLevel } from '@/types/map';
import { VerificationCrimeReport } from '@/types/map';

interface UseMapCrimeMarkersProps {
    isLeafletLoaded: boolean;
    mapInstanceRef: React.MutableRefObject<any>;
    markersLayerRef: React.MutableRefObject<any>;
    reports: VerificationCrimeReport[];
    onMarkerClick: (reportId: string) => void;
    selectedReportId?: string | null;
}

// Màu marker dựa trên mức độ nghiêm trọng (severityLevel)
const severityColorMap: Record<string, { hex: string; rgb: string; shadow: string }> = {
    low: { hex: '#56a381', rgb: '86, 163, 129', shadow: '0 0 0 2px rgba(86, 163, 129, 0.3)' },      // Xanh - Nguy hiểm thấp
    medium: { hex: '#fcf160', rgb: '252, 241, 96', shadow: '0 0 0 2px rgba(252, 241, 96, 0.3)' },  // Vàng - Nguy hiểm trung bình
    high: { hex: '#dd3121', rgb: '221, 49, 33', shadow: '0 0 0 2px rgba(221, 49, 33, 0.3)' },     // Đỏ - Nguy hiểm cao
};

export const useMapCrimeMarkers = ({
    isLeafletLoaded,
    mapInstanceRef,
    markersLayerRef,
    reports,
    onMarkerClick,
    selectedReportId,
}: UseMapCrimeMarkersProps) => {
    useEffect(() => {
        const L = (window as any).L;
        if (!isLeafletLoaded || !mapInstanceRef.current || !markersLayerRef.current || !L) return;

        markersLayerRef.current.clearLayers();

        reports.forEach((report) => {
            if (!report.lat || !report.lng) return;

            const isSelected = report.id === selectedReportId;

            // Màu marker được quyết định bởi mức độ nghiêm trọng (severityLevel)
            const color = severityColorMap[report.severityLevel] ?? severityColorMap.low;

            const isVerified = [VerificationLevel.VERIFIED, VerificationLevel.CONFIRMED].includes(
                report.verificationLevel ?? VerificationLevel.UNVERIFIED
            );
            const isUnverified = report.verificationLevel === VerificationLevel.UNVERIFIED;

            // Tăng size nếu được chọn
            let size = isVerified ? 22 : 16;
            if (isSelected) size = 32; // Size lớn hơn hẳn khi được chọn

            const markerClass = isUnverified ? 'base-marker marker-unverified' : 'base-marker';
            
            // Style đặc biệt cho marker được chọn
            const selectedStyle = isSelected 
                ? `border: 3px solid #3b82f6; z-index: 1000; transform: scale(1.1); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), ${color.shadow};` 
                : `box-shadow:${color.shadow}, 0 2px 4px rgba(0,0,0,0.2);`;

            const html = `
        <div style="position: relative; width: ${size}px; height: ${size}px;">
          ${isVerified || isSelected ? `<div class="pulse-ring" style="--color-rgb:${isSelected ? '59, 130, 246' : color.rgb}; width: ${size*2}px; height: ${size*2}px; top: -${size/2}px; left: -${size/2}px;"></div>` : ''}
          <div class="${markerClass}" style="background-color:${color.hex} !important;width:100%;height:100%;${selectedStyle}"></div>
        </div>`;

            const marker = L.marker([report.lat, report.lng], {
                icon: L.divIcon({
                    className: isSelected ? 'custom-div-icon selected-marker-icon' : 'custom-div-icon',
                    html,
                    iconSize: [size, size],
                    iconAnchor: [size / 2, size / 2],
                }),
                zIndexOffset: isSelected ? 1000 : 0, // Đưa marker được chọn lên trên cùng
            });

            marker.on('click', (e: any) => {
                L.DomEvent.stopPropagation(e);
                onMarkerClick(report.id);
                mapInstanceRef.current.flyTo([report.lat, report.lng], 16, { duration: 1 });
            });

            markersLayerRef.current.addLayer(marker);
        });
    }, [reports, isLeafletLoaded, mapInstanceRef, markersLayerRef, onMarkerClick, selectedReportId]);
};

