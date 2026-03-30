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
        try {
            const { data } = await apiClient.post(`${AUTH_BASE}/login`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Login error:', error);
            handleApiError(error, 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
    }

    async refreshTokens(payload: RefreshPayload) {
        try {
            const { data } = await apiClient.post(`${AUTH_BASE}/refresh`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Refresh token error:', error);
            handleApiError(error, 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        }
    }

    async changePassword(payload: ChangePasswordPayload) {
        try {
            const { data } = await apiClient.put(`${AUTH_BASE}/change-password`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Change password error:', error);
            handleApiError(error, 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
        }
    }

    async forgotPassword(payload: ForgotPasswordPayload) {
        try {
            const { data } = await apiClient.post(`${AUTH_BASE}/forgot-password`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Forgot password error:', error);
            handleApiError(error, 'Gửi email thất bại. Vui lòng thử lại.');
        }
    }

    async resetPassword(payload: ResetPasswordPayload) {
        try {
            const { data } = await apiClient.post(`${AUTH_BASE}/reset-password`, payload);
            return data;
        } catch (error) {
            console.error('[AuthService] Reset password error:', error);
            handleApiError(error, 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
        }
    }
}

const authService = new AuthService();
export default authService;
