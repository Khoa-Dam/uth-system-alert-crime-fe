import apiClient from '@/utils/apiClient.util';
import { handleApiError } from '@/utils/error.util';

const SCRAPER_BASE = '/scraper';

// Response DTOs
export interface ScraperResponse {
    success: boolean;
    count: number;
    message: string;
}

export interface WantedCriminalsScraperResponse extends ScraperResponse {
    criminals: Record<string, unknown>[];
}

export interface WeatherNewsScraperResponse extends ScraperResponse {
    imported: number;
    updated: number;
    deleted: number;
    errors: number;
    news: Record<string, unknown>[];
}

export interface ScraperStatus {
    wantedCriminals?: {
        lastRun?: string;
        status?: string;
        count?: number;
    };
    weatherNews?: {
        lastRun?: string;
        status?: string;
        count?: number;
    };
}

class ScraperService {
    /**
     * Trigger wanted criminals scraper (Admin only)
     * @param pages Number of pages to scrape (default 5)
     * @param limit Max number of items to scrape (overrides pages)
     */
    async triggerWantedCriminalsScraper(pages?: number, limit?: number): Promise<WantedCriminalsScraperResponse> {
        try {
            const params: Record<string, string | number> = {};
            if (pages) params.pages = pages;
            if (limit) params.limit = limit;

            const response = await apiClient.post<WantedCriminalsScraperResponse>(
                `${SCRAPER_BASE}/wanted-criminals`,
                null,
                { params }
            );
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể kích hoạt scraper đối tượng truy nã');
        }
    }

    /**
     * Trigger weather news scraper (Admin only)
     */
    async triggerWeatherNewsScraper(): Promise<WeatherNewsScraperResponse> {
        try {
            const response = await apiClient.post<WeatherNewsScraperResponse>(
                `${SCRAPER_BASE}/weather-news`
            );
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể kích hoạt scraper tin thời tiết');
        }
    }

    /**
     * Get scraper status (Public)
     */
    async getScraperStatus(): Promise<ScraperStatus> {
        try {
            const response = await apiClient.get<ScraperStatus>(`${SCRAPER_BASE}/status`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tải trạng thái scraper');
        }
    }

    /**
     * Get weather scraper status (Public)
     */
    async getWeatherScraperStatus(): Promise<Record<string, unknown>> {
        try {
            const response = await apiClient.get(`${SCRAPER_BASE}/weather-status`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Không thể tải trạng thái scraper thời tiết');
        }
    }

    /**
     * Centralized error handler
     */
    private handleError(error: unknown, defaultMessage: string): never {
        handleApiError(error, defaultMessage);
    }
}

export const scraperService = new ScraperService();
