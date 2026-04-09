"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useTestimonials = ({ isVisible, page, pageSize }) => {
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.TESTIMONIALS)
    const canAdd = checkAdd(Resources.TESTIMONIALS)
    const canEdit = checkEdit(Resources.TESTIMONIALS)
    const canDelete = checkDelete(Resources.TESTIMONIALS)

    const buildQueryString = () => {
        const queryParams = [];

        if (isVisible !== 'all') queryParams.push(`isVisible=${isVisible === 'isVisible'}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const testimonialsQuery = useQuery({
        queryKey: ['testimonials', isVisible, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view enquiries');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/testimonials${queryString}`);
            return response;
        },
        enabled: canView, // Only run query if user has permission
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        onError: (err) => {
            console.error('Testimonials fetch error:', err);
            toast.error(err.message || 'Failed to fetch testimonials');
        },
    });

    const createTestimonial = useMutation({
        mutationFn: ({ data }) => api.post('/testimonials', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create Testimonial');
        }
    });

    const updateTestimonial = useMutation({
        mutationFn: ({ id, data }) => api.put(`/testimonials/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Testimonial');
        }
    });

    const patchTestimonial = useMutation({
        mutationFn: ({ id, isVisible: newVisible, priority: newPriority }) => {
            return api.patch(`/testimonials/${id}`, {
                id,
                ...(newVisible !== undefined ? { isVisible: newVisible } : {}),
                ...(newPriority !== undefined ? { priority: newPriority } : {}),
            });
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Testimonial');
        },
    });

    const deleteTestimonial = useMutation({
        mutationFn: (id) => {
            return api.delete(`/testimonials/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete testimonial!');
        },
    });

    return {
        testimonialsQuery,
        createTestimonial,
        updateTestimonial,
        patchTestimonial,
        deleteTestimonial,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        }
    };
}
