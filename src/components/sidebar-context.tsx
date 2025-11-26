"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarStateProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false) // Mặc định đóng trên mobile

    const toggle = () => setIsOpen((prev) => !prev)

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebarState() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebarState must be used within SidebarStateProvider")
    }
    return context
}

