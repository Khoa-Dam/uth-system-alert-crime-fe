import { useQuery } from '@tanstack/react-query';
import homeService, { HomeResponse } from '@/service/home.service';

// Query keys for cache management
export const homeKeys = {
    all: ['home'] as const,
    data: () => [...homeKeys.all, 'data'] as const,
};

/**
 * Hook to fetch home/dashboard data with caching
 * Includes wanted criminals and basic statistics
 */
export function useHomeData() {
    return useQuery<HomeResponse>({
        queryKey: homeKeys.data(),
        queryFn: () => homeService.getHomeData(),
    });
}

