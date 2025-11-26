'use client';

import { useQuery } from '@tanstack/react-query';
import weatherNewsService, { WeatherNewsResponse, WeatherNewsType } from '@/service/weather-news.service';

const weatherNewsKeys = {
    all: ['weatherNews'] as const,
    list: (type?: WeatherNewsType) => [...weatherNewsKeys.all, type ?? 'all'] as const,
    detail: (id: string) => [...weatherNewsKeys.all, 'detail', id] as const,
};

export function useWeatherNews(type?: WeatherNewsType) {
    return useQuery<WeatherNewsResponse[]>({
        queryKey: weatherNewsKeys.list(type),
        queryFn: () => weatherNewsService.findAll(type),
        staleTime: 1000 * 60 * 5,
    });
}

export function useWeatherNewsDetail(id?: string) {
    return useQuery<WeatherNewsResponse>({
        queryKey: id ? weatherNewsKeys.detail(id) : weatherNewsKeys.detail('unknown'),
        queryFn: () => {
            if (!id) {
                return Promise.reject(new Error('Missing weather news id'));
            }
            return weatherNewsService.findOne(id);
        },
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });
}

export type { WeatherNewsResponse, WeatherNewsType } from '@/service/weather-news.service';

