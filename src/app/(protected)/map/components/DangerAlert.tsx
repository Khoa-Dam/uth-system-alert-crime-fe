'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

interface DangerAlertProps {
    message: string;
    onClose: () => void;
}

export const DangerAlert: React.FC<DangerAlertProps> = ({ message, onClose }) => (
    <div className="fixed top-15 right-4 z-50 w-full max-w-sm animate-in slide-in-from-right-5">
        {/* Thay đổi: Nền trắng/nhạt, viền đỏ */}
        <Alert className="danger-alert-dark shadow-lg">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <div className="flex items-start justify-between gap-2 ml-2">
                <div>
                    <AlertTitle className="text-[#ff3b3b] font-mono font-bold tracking-widest text-xs">⚠ CẢNH BÁO</AlertTitle>
                    <AlertDescription className="text-red-300/90 font-mono text-xs mt-1">
                        {message}
                    </AlertDescription>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-6 w-6 text-[#ff3b3b]/60 hover:bg-[rgba(255,59,59,0.1)] hover:text-[#ff3b3b] -mt-1"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </Alert>
    </div>
);