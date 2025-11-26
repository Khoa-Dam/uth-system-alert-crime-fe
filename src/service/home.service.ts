import apiClient from '@/utils/apiClient.util';

export interface HomeWantedCriminal {
    id: string;
    name: string;
    birthYear: number;
    address?: string;
    parents?: string;
    crime: string;
    decisionNumber?: string;
    issuingUnit?: string;
    createdAt: string;
}

export interface HomeStatistics {
    totalWanted: number;
}

export interface HomeResponse {
    recentWantedCriminals: HomeWantedCriminal[];
    statistics: HomeStatistics;
}

class HomeService {
    async getHomeData(): Promise<HomeResponse> {
        try {
            const { data } = await apiClient.get<HomeResponse>('/home');
            return data;
        } catch (error: any) {
            const errorData = error?.response?.data;
            const errorMessage =
                errorData?.message ||
                errorData?.error ||
                error?.message ||
                'Không thể tải dữ liệu trang chủ.';
            throw new Error(errorMessage);
        }
    }
}

export default new HomeService();


