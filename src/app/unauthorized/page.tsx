import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full space-y-6">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <Logo className="w-12 h-12 text-red-600" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Truy cập bị từ chối</h1>
                    <p className="text-gray-500">
                        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là một sự nhầm lẫn.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <Button asChild className="w-full">
                        <Link href="/dashboard">
                            Về trang chủ
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/login">
                            Đăng nhập tài khoản khác
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
