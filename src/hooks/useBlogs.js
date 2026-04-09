import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { Resources } from "@/lib/permissions";
import { usePermissions } from "./usePermissions";
import { useRouter } from "next/navigation";

export const useBlogs = ({
  featured = "all",
  status = "active",
  page = 1,
  pageSize = 10,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } =
    usePermissions();

  // Permissions
  const canView = checkView(Resources.BLOGS);
  const canAdd = checkAdd(Resources.BLOGS);
  const canEdit = checkEdit(Resources.BLOGS);
  const canDelete = checkDelete(Resources.BLOGS);

  // Build query params
  const queryParams = [];
  if (status !== "all") queryParams.push(`status=${status === "active"}`);
  if (featured !== "all")
    queryParams.push(`featured=${featured === "featured"}`);
  queryParams.push(`page=${page}`);
  queryParams.push(`limit=${pageSize}`);
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  // Fetch blogs with filters
  const blogsQuery = useQuery({
    queryKey: ["blogs", status, featured, page, pageSize],
    queryFn: () => api.get(`/blogs${queryString}`),
    keepPreviousData: true,
    enabled: canView,
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch blogs");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  // Create blog
  const createBlog = useMutation({
    mutationFn: (data) => api.post("/blogs", data),
    enabled: canAdd,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("Blog created successfully");
      router.push("/admin/blogs");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create blog");
    },
  });

  // Update blog
  const updateBlog = useMutation({
    mutationFn: ({ id, data }) => api.put(`/blogs/${id}`, data),
    enabled: canEdit,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("Blog updated successfully");
      router.push("/admin/blogs");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update blog");
    },
  });

  // Delete blog
  const deleteBlog = useMutation({
    mutationFn: (id) => api.delete(`/blogs/${id}`),
    enabled: canDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("Blog deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete blog");
    },
  });

  return {
    blogsQuery,
    createBlog,
    updateBlog,
    deleteBlog,
    permissions: {
      canView,
      canAdd,
      canEdit,
      canDelete,
      onlyAdmin,
    },
  };
};
