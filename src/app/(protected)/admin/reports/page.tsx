'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useReportsQuery, useAdminVerifyReport } from '@/hooks/use-crime-reports';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { VerificationCrimeReport, VerificationLevel } from '@/types/map';

const verificationLevelLabels: Record<VerificationLevel, string> = {
    [VerificationLevel.UNVERIFIED]: 'Chưa xác minh',
    [VerificationLevel.PENDING]: 'Đang chờ',
    [VerificationLevel.CONFIRMED]: 'Đã xác minh',
    [VerificationLevel.VERIFIED]: 'Đã xác thực',
};

const verificationLevelColors: Record<VerificationLevel, string> = {
    [VerificationLevel.UNVERIFIED]: 'bg-gray-500',
    [VerificationLevel.PENDING]: 'bg-yellow-500',
    [VerificationLevel.CONFIRMED]: 'bg-green-500',
    [VerificationLevel.VERIFIED]: 'bg-blue-500',
};

export default function AdminReportsPage() {
    const { data: reports = [], isLoading, error } = useReportsQuery();
    const verifyReportMutation = useAdminVerifyReport();

    const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<VerificationCrimeReport | null>(null);

    // Filter unverified reports
    const unverifiedReports = reports.filter(
        (r) => r.verificationLevel === VerificationLevel.UNVERIFIED || r.verificationLevel === VerificationLevel.PENDING
    );

    const handleVerify = async () => {
        if (!selectedReport) return;

        try {
            await verifyReportMutation.mutateAsync(selectedReport.id);
            toast.success('Đã xác minh báo cáo thành công');
            setVerifyDialogOpen(false);
            setSelectedReport(null);
        } catch (err: any) {
            toast.error(err?.message || 'Không thể xác minh báo cáo');
        }
    };

    const openVerifyDialog = (report: VerificationCrimeReport) => {
        setSelectedReport(report);
        setVerifyDialogOpen(true);
    };

    if (error) {
        return (
            <div className="p-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-destructive">
                            <AlertCircle className="w-5 h-5" />
                            <p>Có lỗi xảy ra: {error.message}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Xác minh báo cáo</h1>
                <p className="text-muted-foreground">
                    Xác minh các báo cáo tội phạm từ người dùng
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Tổng báo cáo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Chờ xác minh</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {unverifiedReports.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Đã xác minh</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {reports.filter((r) => r.verificationLevel === VerificationLevel.VERIFIED || r.verificationLevel === VerificationLevel.CONFIRMED).length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Báo cáo chờ xác minh</CardTitle>
                    <CardDescription>
                        {unverifiedReports.length} báo cáo cần xác minh
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : unverifiedReports.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Không có báo cáo nào cần xác minh
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tiêu đề</TableHead>
                                    <TableHead>Loại</TableHead>
                                    <TableHead>Địa chỉ</TableHead>
                                    <TableHead>Trust Score</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {unverifiedReports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium">
                                            {report.title || 'Không có tiêu đề'}
                                        </TableCell>
                                        <TableCell>{report.type}</TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {report.address || 'Không có địa chỉ'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={report.trustScore >= 50 ? 'default' : 'secondary'}>
                                                {report.trustScore}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    verificationLevelColors[report.verificationLevel] ||
                                                    'bg-gray-500'
                                                }
                                            >
                                                {verificationLevelLabels[report.verificationLevel] ||
                                                    report.verificationLevel}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => openVerifyDialog(report)}
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                                Xác minh
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Verify Confirmation Dialog */}
            <AlertDialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xác minh</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xác minh báo cáo{' '}
                            <strong>{selectedReport?.title}</strong>?
                            <br />
                            <br />
                            Báo cáo sẽ được đánh dấu là <strong>Đã xác thực</strong> với Trust Score = 100.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleVerify}
                            disabled={verifyReportMutation.isPending}
                        >
                            {verifyReportMutation.isPending && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            Xác minh
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
