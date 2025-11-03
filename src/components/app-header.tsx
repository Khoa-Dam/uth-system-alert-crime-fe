"use client"

import { Bell } from "lucide-react"

export function AppHeader() {
    return (
        <header className="flex items-center justify-between bg-white shadow px-6 py-3 border-b">
            {/* Bên trái: tiêu đề */}
            <h1 className="text-lg font-semibold text-gray-700">
                Hệ thống tra cứu tội phạm truy nã
            </h1>

            {/* Bên phải: avatar + tên người dùng */}
            <div className="flex items-center gap-4">
                {/* Icon thông báo */}
                <button className="relative hover:text-amber-600">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Tên người dùng */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="avatar"
                        className="w-9 h-9 rounded-full border"
                    />
                    <div className="text-sm">
                        <p className="font-medium">Nguyễn Văn N</p>
                        <p className="text-gray-500 text-xs">Cục cảnh sát truy nã</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
