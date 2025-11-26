import apiClient from '@/utils/apiClient.util';

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
     * Centralized error handler
     */
    private handleError(error: any, defaultMessage: string): never {
        const errorData = error?.response?.data;
        const errorMessage =
            errorData?.message ||
            errorData?.error ||
            (errorData && typeof errorData === 'string' ? errorData : null) ||
            error?.message ||
            defaultMessage;
        throw new Error(errorMessage);
    }
}

export const userService = new UserService();
