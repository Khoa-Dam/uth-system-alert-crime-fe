import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"

/**
 * Custom hook to get current user information from session
 *
 * @returns User information with formatted name and role
 */
export function useUser() {
    const { data: session, status } = useSession()

    // Auto sign out if session has error (e.g. token refresh failed)
    useEffect(() => {
        if ((session as unknown as { error?: string })?.error) {
            signOut({ callbackUrl: '/login' })
        }
    }, [session])

    const user = session?.user
    const isAuthenticated = status === 'authenticated'
    const isLoading = status === 'loading'

    const userName = user?.name || user?.email || "Người dùng"
    const userRole = user?.role || "Cục cảnh sát truy nã"
    const userId = user?.id || null
    const userEmail = user?.email || null
    const userAvatar = user?.avatar || null
    const isGoogleUser = user?.isGoogleUser ?? false

    return {
        user,
        userName,
        userRole,
        userId,
        userEmail,
        userAvatar,
        isGoogleUser,
        isAuthenticated,
        isLoading,
        session,
    }
}


