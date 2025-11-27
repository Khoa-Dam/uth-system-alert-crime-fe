import { useQuery } from '@tanstack/react-query';
import weatherNewsService, { WeatherNewsType } from '@/service/weather-news.service';

export const weatherNewsKeys = {
    all: ['weather-news'] as const,
    lists: () => [...weatherNewsKeys.all, 'list'] as const,
    list: (type?: WeatherNewsType) => [...weatherNewsKeys.lists(), { type }] as const,
    details: () => [...weatherNewsKeys.all, 'detail'] as const,
    detail: (id: string) => [...weatherNewsKeys.details(), id] as const,
};

export function useWeatherNews(type?: WeatherNewsType) {
    return useQuery({
        queryKey: weatherNewsKeys.list(type),
        queryFn: () => weatherNewsService.findAll(type),
    });
}

export function useWeatherNewsDetail(id: string) {
    return useQuery({
        queryKey: weatherNewsKeys.detail(id),
        queryFn: () => weatherNewsService.findOne(id),
        enabled: !!id,
    });
}
