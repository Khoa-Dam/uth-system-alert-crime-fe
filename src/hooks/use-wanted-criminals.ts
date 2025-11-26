import { useQuery } from '@tanstack/react-query';
import wantedCriminalService, { WantedCriminalResponse } from '@/service/wanted-criminal.service';

export const wantedKeys = {
    all: ['wanted'] as const,
    lists: () => [...wantedKeys.all, 'list'] as const,
};

export function useWantedCriminals() {
    return useQuery<WantedCriminalResponse[]>({
        queryKey: wantedKeys.lists(),
        queryFn: () => wantedCriminalService.findAll(),
        staleTime: 5 * 60 * 1000,
    });
}

