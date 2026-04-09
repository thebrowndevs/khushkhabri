import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const usePrivacyPolicy = () => {
    const queryClient = useQueryClient();
    const { checkView, checkEdit, checkAdd } = usePermissions();

    const canView = checkView(Resources.PRIVACY_POLICY);
    const canEdit = checkEdit(Resources.PRIVACY_POLICY);
    const canAdd = checkAdd(Resources.PRIVACY_POLICY);

    // Fetch single Privacy Policy
    const policyQuery = useQuery({
        queryKey: ['privacyPolicy'],
        enabled: canView,
        queryFn: () => api.get('/privacy-policy').then(res => res.data),
        onError: (err) => {
            toast.error(err.message || 'Failed to load privacy policy');
        },
        staleTime: 1000 * 60 * 5,
    });

    // Create initial policy
    const createPolicy = useMutation({
        mutationFn: async (newData) => {
            const res = await api.post('/privacy-policy', newData);
            return res.data.data;
        },
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['privacyPolicy']);
            toast.success('Privacy policy created');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create privacy policy');
        },
    });

    // Update existing policy
    const updatePolicy = useMutation({
        mutationFn: ({ id, data }) => api.put(`/privacy-policy/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['privacyPolicy']);
            toast.success('Privacy policy updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update privacy policy');
        },
    });

    return {
        policyQuery,
        createPolicy,
        updatePolicy,
        permissions: {
            canView,
            canAdd,
            canEdit
        }
    };
};
