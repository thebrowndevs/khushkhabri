import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useTermsConditions = () => {
    const queryClient = useQueryClient();
    const { checkView, checkEdit, checkAdd } = usePermissions();

    const canView = checkView(Resources.TERMS_AND_CONDITIONS);
    const canEdit = checkEdit(Resources.TERMS_AND_CONDITIONS);
    const canAdd = checkAdd(Resources.TERMS_AND_CONDITIONS);

    // Fetch single Privacy Policy
    const termsQuery = useQuery({
        queryKey: ['termsConditions'],
        enabled: canView,
        queryFn: () => api.get('/terms-conditions').then(res => res.data),
        onError: (err) => {
            toast.error(err.message || 'Failed to load Terms & Conditions');
        },
        staleTime: 1000 * 60 * 5,
    });

    // Create initial policy
    const createTerms = useMutation({
        mutationFn: async (newData) => {
            const res = await api.post('/terms-conditions', newData);
            return res.data.data;
        },
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['privacyPolicy']);
            toast.success('Terms & Conditions created');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create Terms & Conditions');
        },
    });

    // Update existing policy
    const updateTerms = useMutation({
        mutationFn: ({ id, data }) => api.put(`/terms-conditions/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['privacyPolicy']);
            toast.success('Terms & Conditions updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Terms & Conditions');
        },
    });

    return {
        termsQuery,
        createTerms,
        updateTerms,
        permissions: {
            canView,
            canAdd,
            canEdit
        }
    };
};
