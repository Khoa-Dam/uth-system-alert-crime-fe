import axios from 'axios';

/**
 * A robustly typed mapping for Axios API errors without utilizing 'any'.
 * Eliminates ESLint explicit-any constraints while allowing nested JSON data access.
 */
export function handleApiError(error: unknown, defaultMessage: string): never {
    let errorMessage = defaultMessage;
    
    if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as Record<string, unknown> | string | undefined;
        errorMessage = 
            (typeof errorData === 'object' && errorData !== null && typeof errorData.message === 'string') ? errorData.message :
            (typeof errorData === 'object' && errorData !== null && typeof errorData.error === 'string') ? errorData.error :
            (typeof errorData === 'string' ? errorData : null) ||
            error.message ||
            defaultMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
    
    throw new Error(errorMessage);
}
