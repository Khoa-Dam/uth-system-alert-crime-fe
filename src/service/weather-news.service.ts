import apiClient from '@/utils/apiClient.util';

export enum WeatherNewsType {
    DISASTER_WARNING = 'disaster_warning',
    WEATHER_FORECAST = 'weather_forecast',
}

export interface WeatherNewsResponse {
    id: string;
    type: WeatherNewsType;
    title: string;
    summary?: string;
    content?: string;
    imageUrl?: string;
    sourceUrl?: string;
    publishedDate?: Date;
    nextUpdateAt?: Date;
    location?: string;
    severity?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateWeatherNewsDto {
    type: WeatherNewsType;
    title: string;
    summary?: string;
    content?: string;
    imageUrl?: string;
    sourceUrl?: string;
    publishedDate?: Date;
    nextUpdateAt?: Date;
    location?: string;
    severity?: string;
}

export interface UpdateWeatherNewsDto {
    type?: WeatherNewsType;
    title?: string;
    summary?: string;
    content?: string;
    imageUrl?: string;
    sourceUrl?: string;
    publishedDate?: Date;
    nextUpdateAt?: Date;
    location?: string;
    severity?: string;
}

class WeatherNewsService {
    private readonly basePath = '/weather-news';

    async findAll(type?: WeatherNewsType): Promise<WeatherNewsResponse[]> {
        const params = type ? { type } : undefined;
        const { data } = await apiClient.get<WeatherNewsResponse[]>(this.basePath, { params });
        return data;
    }

    async findOne(id: string): Promise<WeatherNewsResponse> {
        const { data } = await apiClient.get<WeatherNewsResponse>(`${this.basePath}/${id}`);
        return data;
    }

    async create(payload: CreateWeatherNewsDto): Promise<WeatherNewsResponse> {
        const { data } = await apiClient.post<WeatherNewsResponse>(this.basePath, payload);
        return data;
    }

    async update(id: string, payload: UpdateWeatherNewsDto): Promise<WeatherNewsResponse> {
        const { data } = await apiClient.put<WeatherNewsResponse>(`${this.basePath}/${id}`, payload);
        return data;
    }

    async remove(id: string): Promise<void> {
        await apiClient.delete(`${this.basePath}/${id}`);
    }
}

export default new WeatherNewsService();

