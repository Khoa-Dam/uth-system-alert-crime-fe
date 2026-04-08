'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

const severityColors = {
    low: '#56a381',
    medium: '#fcf160',
    high: '#dd3121',
};

const severityLabels = {
    low: 'Nguy hiểm thấp',
    medium: 'Nguy hiểm trung bình',
    high: 'Nguy hiểm cao',
};

export const MapLegend: React.FC = () => {
    return (
        <Card className="map-legend absolute bottom-20 left-4 z-[44] pointer-events-auto p-3 max-w-xs rounded">
            <div className="space-y-2">
                <h3 className="text-sm font-semibold mb-2">Chú thích icon</h3>
                <div className="space-y-1.5">
                    {(['high', 'medium', 'low'] as const).map((level) => (
                        <div key={level} className="flex items-center gap-2 text-xs">
                            <div
                                className="w-4 h-4 rounded-full border-2 border-white shrink-0"
                                style={{
                                    backgroundColor: severityColors[level],
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                }}
                            />
                            <span className="">{severityLabels[level]}</span>
                        </div>
                    ))}
                    <div className="legend-divider flex items-center gap-2 text-xs pt-1 border-t mt-2">
                        <div className="relative w-4 h-4 shrink-0">
                            <div
                                className="absolute inset-0 rounded-full border-2 border-white"
                                style={{
                                    backgroundColor: severityColors.high,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                }}
                            />
                            <div
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                    backgroundColor: severityColors.high,
                                    opacity: 0.4,
                                }}
                            />
                        </div>
                        <span className="">Đã xác minh (có hiệu ứng pulse)</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

