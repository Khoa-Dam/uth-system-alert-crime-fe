import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scraperService, ScraperStatus } from '@/service/scraper.service';

// Query keys for cache management
export const scraperKeys = {
    all: ['scraper'] as const,
    status: () => [...scraperKeys.all, 'status'] as const,
    weatherStatus: () => [...scraperKeys.all, 'weather-status'] as const,
};

/**
 * React Query hook for fetching scraper status
 */
export function useScraperStatusQuery() {
    return useQuery({
        queryKey: scraperKeys.status(),
        queryFn: () => scraperService.getScraperStatus(),
        refetchInterval: 30000, // Refetch every 30 seconds
    });
}

/**
 * React Query hook for fetching weather scraper status
 */
export function useWeatherScraperStatusQuery() {
    return useQuery({
        queryKey: scraperKeys.weatherStatus(),
        queryFn: () => scraperService.getWeatherScraperStatus(),
        refetchInterval: 30000,
    });
}

/**
 * Mutation hook for triggering wanted criminals scraper (Admin only)
 */
export function useTriggerWantedCriminalsScraper() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ pages, limit }: { pages?: number; limit?: number }) =>
            scraperService.triggerWantedCriminalsScraper(pages, limit),
        onSuccess: () => {
            // Invalidate scraper status to refresh
            queryClient.invalidateQueries({ queryKey: scraperKeys.status() });
            // Invalidate wanted criminals list if it exists
            queryClient.invalidateQueries({ queryKey: ['wanted-criminals'] });
        },
    });
}

/**
 * Mutation hook for triggering weather news scraper (Admin only)
 */
export function useTriggerWeatherNewsScraper() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => scraperService.triggerWeatherNewsScraper(),
        onSuccess: () => {
            // Invalidate scraper status to refresh
            queryClient.invalidateQueries({ queryKey: scraperKeys.status() });
            queryClient.invalidateQueries({ queryKey: scraperKeys.weatherStatus() });
            // Invalidate weather news list if it exists
            queryClient.invalidateQueries({ queryKey: ['weather-news'] });
        },
    });
}
