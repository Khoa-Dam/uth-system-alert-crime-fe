import { useQuery } from '@tanstack/react-query';
import reportService, { CrimeStatistics, CrimeHeatmapData } from '@/service/report.service';

// Query keys for cache management
export const statisticsKeys = {
    all: ['statistics'] as const,
    statistics: () => [...statisticsKeys.all, 'stats'] as const,
    heatmap: () => [...statisticsKeys.all, 'heatmap'] as const,
};

/**
 * Hook to fetch crime statistics with caching
 * Data is shared between dashboard and reports pages
 */
export function useStatistics() {
    return useQuery<CrimeStatistics>({
        queryKey: statisticsKeys.statistics(),
        queryFn: () => reportService.getStatistics(),
    });
}

/**
 * Hook to fetch heatmap data with caching
 */
export function useHeatmap() {
    return useQuery<CrimeHeatmapData[]>({
        queryKey: statisticsKeys.heatmap(),
        queryFn: () => reportService.getHeatmap(),
    });
}

