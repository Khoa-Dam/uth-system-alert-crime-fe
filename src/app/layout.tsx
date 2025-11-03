import "../styles/globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export const metadata = {
  title: "Hệ thống tra cứu tội phạm truy nã",
  description: "Ứng dụng quản lý và theo dõi tội phạm truy nã toàn quốc",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar />

            <div className="flex flex-col grow flex-1 bg-gray-50">
              <div>
                <AppHeader />
              </div>
              <main className="p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
