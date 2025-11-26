import { useMutation, useQueryClient } from '@tanstack/react-query';
import wantedCriminalService, {
    CreateWantedCriminalDto,
    UpdateWantedCriminalDto,
} from '@/service/wanted-criminal.service';

// Query keys (reuse from existing hooks if they exist)
export const wantedCriminalsKeys = {
    all: ['wanted-criminals'] as const,
    lists: () => [...wantedCriminalsKeys.all, 'list'] as const,
    detail: (id: string) => [...wantedCriminalsKeys.all, 'detail', id] as const,
};

/**
 * Mutation hook for creating a wanted criminal (Admin only)
 */
export function useCreateWantedCriminal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateWantedCriminalDto) => wantedCriminalService.create(payload),
        onSuccess: () => {
            // Invalidate and refetch wanted criminals list
            queryClient.invalidateQueries({ queryKey: wantedCriminalsKeys.lists() });
        },
    });
}

/**
 * Mutation hook for updating a wanted criminal (Admin only)
 */
export function useUpdateWantedCriminal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateWantedCriminalDto }) =>
            wantedCriminalService.update(id, payload),
        onSuccess: (data, variables) => {
            // Invalidate wanted criminals list
            queryClient.invalidateQueries({ queryKey: wantedCriminalsKeys.lists() });
            // Invalidate specific wanted criminal detail
            queryClient.invalidateQueries({ queryKey: wantedCriminalsKeys.detail(variables.id) });
        },
    });
}

/**
 * Mutation hook for deleting a wanted criminal (Admin only)
 */
export function useDeleteWantedCriminal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => wantedCriminalService.delete(id),
        onSuccess: () => {
            // Invalidate wanted criminals list
            queryClient.invalidateQueries({ queryKey: wantedCriminalsKeys.lists() });
        },
    });
}
