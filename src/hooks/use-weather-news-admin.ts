import { useMutation, useQueryClient } from '@tanstack/react-query';
import weatherNewsService, {
    CreateWeatherNewsDto,
    UpdateWeatherNewsDto,
} from '@/service/weather-news.service';
import { weatherNewsKeys } from './use-weather-news';

/**
 * Mutation hook for creating weather news (Admin only)
 */
export function useCreateWeatherNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateWeatherNewsDto) => weatherNewsService.create(payload),
        onSuccess: () => {
            // Invalidate and refetch weather news list
            queryClient.invalidateQueries({ queryKey: weatherNewsKeys.lists() });
        },
    });
}

/**
 * Mutation hook for updating weather news (Admin only)
 */
export function useUpdateWeatherNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateWeatherNewsDto }) =>
            weatherNewsService.update(id, payload),
        onSuccess: (data, variables) => {
            // Invalidate weather news list
            queryClient.invalidateQueries({ queryKey: weatherNewsKeys.lists() });
            // Invalidate specific weather news detail
            queryClient.invalidateQueries({ queryKey: weatherNewsKeys.detail(variables.id) });
        },
    });
}

/**
 * Mutation hook for deleting weather news (Admin only)
 */
export function useDeleteWeatherNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => weatherNewsService.remove(id),
        onSuccess: () => {
            // Invalidate weather news list
            queryClient.invalidateQueries({ queryKey: weatherNewsKeys.lists() });
        },
    });
}
