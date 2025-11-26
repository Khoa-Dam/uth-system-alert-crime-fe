import apiClient from '@/utils/apiClient.util';

const WANTED_CRIMINAL_BASE = '/wanted-criminals';

// Request DTOs
export interface CreateWantedCriminalDto {
    name: string; // Họ tên đối tượng
    birthYear: number; // Năm sinh
    address?: string; // Nơi ĐKTT (Đăng ký thường trú)
    parents?: string; // Họ tên bố/mẹ
    crime: string; // Tội danh
    decisionNumber?: string; // Số ngày QĐ
    issuingUnit?: string; // Đơn vị ra QĐTN (Quyết định truy nã)
}

export interface UpdateWantedCriminalDto {
    name?: string;
    birthYear?: number;
    address?: string;
    parents?: string;
    crime?: string;
    decisionNumber?: string;
    issuingUnit?: string;
}

// Response DTOs
export interface WantedCriminalResponse {
    id: string;
    name: string;
    birthYear: number;
    address?: string;
    parents?: string;
    crime: string;
    decisionNumber?: string;
    issuingUnit?: string;
    createdAt: Date;
}

class WantedCriminalService {
    /**
     * Get all wanted criminals
     * Public endpoint, no authentication required
     */
    async findAll(): Promise<WantedCriminalResponse[]> {
        try {
            const { data } = await apiClient.get<WantedCriminalResponse[]>(WANTED_CRIMINAL_BASE);
            return data;
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                error?.message ||
                'Không thể tải danh sách đối tượng truy nã. Vui lòng thử lại.';
            throw new Error(errorMessage);
        }
    }

    /**
     * Get wanted criminal by ID
     * Public endpoint, no authentication required
     */
    async findOne(id: string): Promise<WantedCriminalResponse> {
        try {
            const { data } = await apiClient.get<WantedCriminalResponse>(`${WANTED_CRIMINAL_BASE}/${id}`);
            return data;
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                error?.message ||
                'Không thể tải thông tin đối tượng truy nã. Vui lòng thử lại.';
            throw new Error(errorMessage);
        }
    }

    /**
     * Create a new wanted criminal
     * Requires authentication and Admin role
     */
    async create(payload: CreateWantedCriminalDto): Promise<WantedCriminalResponse> {
        try {
            const { data } = await apiClient.post<WantedCriminalResponse>(
                WANTED_CRIMINAL_BASE,
                payload
            );
            return data;
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                (errorData && typeof errorData === 'string' ? errorData : null) ||
                error?.message ||
                'Không thể tạo đối tượng truy nã. Vui lòng thử lại.';
            throw new Error(errorMessage);
        }
    }

    /**
     * Update a wanted criminal
     * Requires authentication and Admin role
     */
    async update(id: string, payload: UpdateWantedCriminalDto): Promise<WantedCriminalResponse> {
        try {
            const { data } = await apiClient.put<WantedCriminalResponse>(
                `${WANTED_CRIMINAL_BASE}/${id}`,
                payload
            );
            return data;
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                (errorData && typeof errorData === 'string' ? errorData : null) ||
                error?.message ||
                'Không thể cập nhật đối tượng truy nã. Vui lòng thử lại.';
            throw new Error(errorMessage);
        }
    }

    /**
     * Delete a wanted criminal
     * Requires authentication and Admin role
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`${WANTED_CRIMINAL_BASE}/${id}`);
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                (errorData && typeof errorData === 'string' ? errorData : null) ||
                error?.message ||
                'Không thể xóa đối tượng truy nã. Vui lòng thử lại.';
            throw new Error(errorMessage);
        }
    }
}

export default new WantedCriminalService();

