"use client"

import { MapPin, Home, MessageSquareWarning, ShieldX, CloudRain, Phone, FileText, AlertTriangle, ShieldCheck, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useStatistics } from "@/hooks/use-statistics"
import { useHomeData } from "@/hooks/use-home-data"
import { Spinner } from "@/components/ui/spinner"

interface SidebarProps {
    isOpen: boolean
    selectedCategory?: string
    onCategoryChange?: (category: string) => void
    onClose?: () => void
}

export default function Sidebar({
    isOpen,
    onClose,
}: SidebarProps) {
    const pathname = usePathname()

    const { data: stats, isLoading: statsLoading } = useStatistics()
    const { data: homeData, isLoading: homeLoading } = useHomeData()

    const navItems = [
        { label: "Luồng Tin Trực tiếp", href: "/", icon: Home },
        { label: "Danh Sách Truy Nã", href: "/wanted", icon: ShieldX },
        { label: "Thời Tiết & Thiên Tai", href: "/weather", icon: CloudRain },
        { label: "Bản Đồ", href: "/map", icon: MapPin },
        { label: "Báo Cáo", href: "/reports", icon: MessageSquareWarning },
        { label: "landing-page", href: "/landing-page", icon: Globe },

    ]

    const emergencyContacts = [
        { label: "Công an", number: "113" },
        { label: "Cứu hỏa", number: "114" },
        { label: "Cấp cứu", number: "115" },
    ]

    const miniStats = [
        { label: "Tổng báo cáo", value: stats?.total, icon: FileText, color: "text-blue-500" },
        { label: "Đang hoạt động", value: stats?.activeAlerts, icon: AlertTriangle, color: "text-amber-500" },
        { label: "Mức độ cao", value: stats?.highSeverity, icon: ShieldCheck, color: "text-red-500" },
        { label: "Truy nã", value: homeData?.statistics?.totalWanted, icon: Users, color: "text-purple-500" },
    ]

    const isLoading = statsLoading || homeLoading

    return (
        <>
            {/* Overlay cho mobile khi sidebar mở */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "bg-card border-r border-border transition-transform duration-300 overflow-y-auto flex flex-col shrink-0 w-64",
                    // Mobile: fixed overlay với translate, Desktop: sticky trong flex container
                    "fixed md:sticky inset-y-0 left-0 md:top-0 md:left-auto z-50 h-screen",
                    // Mobile: ẩn/hiện bằng translate, Desktop: luôn hiện
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                )}
            >
                <div className="p-4 space-y-6">
                    {/* Mini Stats */}


                    {/* Navigation */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Điều hướng</p>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = item.href === "/"
                                    ? pathname === "/" // trang chính
                                    : pathname.startsWith(item.href)

                                return (
                                    <Link key={item.href} href={item.href}>
                                        <Button
                                            variant={isActive ? "secondary" : "ghost"}
                                            size="sm"
                                            className={cn(
                                                "w-full justify-start",
                                                isActive && "bg-primary/10 text-primary hover:bg-primary/15"
                                            )}
                                            onClick={() => onClose?.()}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {item.label}
                                        </Button>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Thống kê nhanh</p>
                        <div className="grid grid-cols-2 gap-2">
                            {miniStats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col items-center gap-1 rounded-lg border border-border bg-muted/30 p-2 text-center"
                                    >
                                        <Icon className={cn("w-4 h-4", stat.color)} />
                                        <span className="text-lg font-bold">
                                            {isLoading ? (
                                                <Spinner className="w-4 h-4" />
                                            ) : (
                                                stat.value?.toLocaleString("vi-VN") ?? "—"
                                            )}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* Emergency Hotlines */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hotline khẩn cấp</p>
                        <div className="grid grid-cols-3 gap-2">
                            {emergencyContacts.map((contact) => (
                                <a
                                    key={contact.number}
                                    href={`tel:${contact.number}`}
                                    className="flex flex-col items-center gap-1 rounded-lg border border-border p-2 text-center hover:bg-muted transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-red-500" />
                                    <span className="text-xs font-medium">{contact.number}</span>
                                    <span className="text-[10px] text-muted-foreground">{contact.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Action */}
                    <div className="border-t border-border pt-4 space-y-2">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="sm" asChild>
                            <Link href="/map">Gửi Báo cáo Sự cố</Link>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    )
}
