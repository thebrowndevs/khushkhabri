import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useRefundPolicy = () => {
    const queryClient = useQueryClient();
    const { checkView, checkEdit, checkAdd } = usePermissions();

    const canView = checkView(Resources.REFUND_POLICY);
    const canEdit = checkEdit(Resources.REFUND_POLICY);
    const canAdd = checkAdd(Resources.REFUND_POLICY);

    // Fetch single Refund Policy
    const refundQuery = useQuery({
        queryKey: ['refundPolicy'],
        enabled: canView,
        queryFn: () => api.get('/refund-policy').then(res => res.data),
        onError: (err) => {
            toast.error(err.message || 'Failed to load Refund Policy');
        },
        staleTime: 1000 * 60 * 5,
    });

    // Create initial Refund Policy
    const createRefund = useMutation({
        mutationFn: async (newData) => {
            const res = await api.post('/refund-policy', newData);
            return res.data.data;
        },
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['refundPolicy']);
            toast.success('Refund Policy created');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create Refund Policy');
        },
    });

    // Update existing Refund Policy
    const updateRefund = useMutation({
        mutationFn: ({ id, data }) => api.put(`/refund-policy/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['refundPolicy']);
            toast.success('Refund Policy updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Refund Policy');
        },
    });

    return {
        refundQuery,
        createRefund,
        updateRefund,
        permissions: {
            canView,
            canAdd,
            canEdit
        }
    };
};
