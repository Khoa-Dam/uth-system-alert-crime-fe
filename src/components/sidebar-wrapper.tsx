"use client"

import Sidebar from "./sidebar"
import { useSidebarState } from "./sidebar-context"

export default function SidebarWrapper() {
    const { isOpen, setIsOpen } = useSidebarState()

    return (
        <Sidebar
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        />
    )
}
