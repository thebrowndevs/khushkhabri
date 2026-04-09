"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useEnquiries = ({ status, important, page, pageSize }) => {
    const queryClient = useQueryClient()
    const { checkView, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.ENQUIRIES)
    const canEdit = checkEdit(Resources.ENQUIRIES)
    const canDelete = checkDelete(Resources.ENQUIRIES)

    // Build query parameters correctly
    const buildQueryString = () => {
        const queryParams = [];

        // Fix: Send actual status value, not boolean
        if (status !== 'all') {
            queryParams.push(`status=${status}`);
        }

        if (important !== 'all') {
            queryParams.push(`important=${important === 'important' ? 'true' : 'false'}`);
        }

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const enquiriesQuery = useQuery({
        queryKey: ['enquiries', status, important, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view enquiries');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/enquiry${queryString}`);
            return response;
        },
        enabled: canView, // Only run query if user has permission
        staleTime: 1000 * 10, // 5 minutes
        retry: 2,
        onError: (err) => {
            console.error('Enquiries fetch error:', err);
            toast.error(err.message || 'Failed to fetch enquiries');
        },
    });

    const updateEnquiry = useMutation({
        mutationFn: ({ id, status: newStatus, important: newImportant }) => {
            return api.patch(`/enquiry/${id}`, {
                id,
                ...(newStatus !== undefined ? { status: newStatus } : {}),
                ...(newImportant !== undefined ? { important: newImportant } : {}),
            });
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['enquiries']);
            toast.success('Enquiry updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update enquiry');
        },
    });

    const deleteEnquiry = useMutation({
        mutationFn: (id) => {
            return api.delete(`/enquiry/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['enquiries']);
            toast.success('Enquiry deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete enquiry');
        },
    });

    return {
        enquiriesQuery,
        updateEnquiry,
        deleteEnquiry,
        permissions: {
            canView,
            canDelete,
            canEdit,
            onlyAdmin
        }
    };
};
