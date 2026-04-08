import apiClient from '@/utils/apiClient.util';
import { handleApiError } from '@/utils/error.util';

const USER_BASE = '/users';

// Role Enum (matching backend)
export enum Role {
    User = 'User',
    Admin = 'Admin',
    Officer = 'Officer',
}

// Request DTOs
export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    role?: Role;
}

// Response DTOs
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string | null;
    googleId?: string | null;
}

class UserService {
    /**
     * Get all users (Admin only)
     */
    async findAll(): Promise<User[]> {
        try {
            const response = await apiClient.get<User[]>(USER_BASE);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tải danh sách người dùng');
        }
    }

    /**
     * Get user by ID (Admin only)
     */
    async findOne(id: string): Promise<User> {
        try {
            const response = await apiClient.get<User>(`${USER_BASE}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tải thông tin người dùng');
        }
    }

    /**
     * Create a new user (Admin only)
     */
    async create(dto: CreateUserDto): Promise<User> {
        try {
            const response = await apiClient.post<User>(USER_BASE, dto);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tạo người dùng');
        }
    }

    /**
     * Update a user (Admin only)
     */
    async update(id: string, dto: UpdateUserDto): Promise<User> {
        try {
            const response = await apiClient.put<User>(`${USER_BASE}/${id}`, dto);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể cập nhật người dùng');
        }
    }

    /**
     * Delete a user (Admin only)
     */
    async remove(id: string): Promise<void> {
        try {
            await apiClient.delete(`${USER_BASE}/${id}`);
        } catch (error) {
            this.handleError(error, 'Không thể xóa người dùng');
        }
    }

    /**
     * Get own profile
     */
    async getMe(): Promise<User> {
        try {
            const response = await apiClient.get<User>(`${USER_BASE}/me`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tải thông tin cá nhân');
        }
    }

    /**
     * Update own profile (name and/or avatar file)
     */
    async updateMe(payload: { name?: string; avatar?: File }): Promise<User> {
        try {
            const formData = new FormData();
            if (payload.name !== undefined) formData.append('name', payload.name);
            if (payload.avatar) formData.append('avatar', payload.avatar);

            const response = await apiClient.put<User>(`${USER_BASE}/me`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            this.handleError(error, 'Cập nhật thông tin thất bại. Vui lòng thử lại.');
        }
    }

    /**
     * Centralized error handler
     */
    private handleError(error: unknown, defaultMessage: string): never {
        handleApiError(error, defaultMessage);
    }
}

export const userService = new UserService();
