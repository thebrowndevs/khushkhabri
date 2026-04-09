import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { Resources } from "@/lib/permissions";
import { usePermissions } from "./usePermissions";

export const useBanners = () => {
  const queryClient = useQueryClient();
  const { checkView, checkAdd, checkDelete } = usePermissions();

  // Permissions
  const canView = checkView(Resources.BANNERS);
  const canAdd = checkAdd(Resources.BANNERS);
  const canDelete = checkDelete(Resources.BANNERS);

  // Get all banners
  const bannersQuery = useQuery({
    queryKey: ["banners"],
    enabled: canView,
    queryFn: () => api.get("/banners").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch banners");
    },
  });

  // Create banner
  const createBanner = useMutation({
    mutationFn: ({ data }) => api.post("/banners", data),
    enabled: canAdd,
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      toast.success("Banner created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create banner");
    },
  });

  // Delete banner
  const deleteBanner = useMutation({
    mutationFn: (id) => api.delete(`/banners/${id}`),
    enabled: canDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      toast.success("Banner deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete banner");
    },
  });

  const banners = bannersQuery.data?.data || [];

  return {
    bannersQuery,
    createBanner,
    deleteBanner,
    permissions: {
      canView,
      canAdd,
      canDelete,
    },
    banners,
  };
};
