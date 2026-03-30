import apiClient from '@/utils/apiClient.util';
import { handleApiError } from '@/utils/error.util';

const AUTH_BASE = '/auth';

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RefreshPayload {
    refreshToken: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    resetToken: string;
    newPassword: string;
}

class AuthService {
    async signup(payload: SignupPayload) {
        try {
            const { data } = await apiClient.post(`${AUTH_BASE}/signup`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Signup error:', error);
            handleApiError(error, 'Đăng ký thất bại. Vui lòng thử lại.');
        }
    }

    async login(payload: LoginPayload) {
        const { data } = await apiClient.post(`${AUTH_BASE}/login`, payload);
        return data;
    }

    async refreshTokens(payload: RefreshPayload) {
        const { data } = await apiClient.post(`${AUTH_BASE}/refresh`, payload);
        return data;
    }

    async changePassword(payload: ChangePasswordPayload) {
        const { data } = await apiClient.put(`${AUTH_BASE}/change-password`, payload);
        return data;
    }

    async forgotPassword(payload: ForgotPasswordPayload) {
        const { data } = await apiClient.post(`${AUTH_BASE}/forgot-password`, payload);
        return data;
    }

    async resetPassword(payload: ResetPasswordPayload) {
        const { data } = await apiClient.post(`${AUTH_BASE}/reset-password`, payload);
        return data;
    }
}

const authService = new AuthService();
export default authService;

