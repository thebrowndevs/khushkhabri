import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { Resources } from "@/lib/permissions";
import { usePermissions } from "./usePermissions";

export const useUsers = ({ role, page = 1, pageSize = 10 }) => {
  const queryClient = useQueryClient();
  const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } =
    usePermissions();

  // Permissions
  const canView = checkView(Resources.USERS);
  const canAdd = checkAdd(Resources.USERS);
  const canEdit = checkEdit(Resources.USERS);
  const canDelete = checkDelete(Resources.USERS);

  // Get all users
  const usersQuery = useQuery({
    queryKey: ["users", role, page, pageSize],
    queryFn: () =>
      api.get(`/users?role=${role}&page=${page}&limit=${pageSize}`),
    keepPreviousData: true,
    enabled: canView,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    onError: (err) => {
      toast.error(err.message || "Failed to fetch users");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const getUserQuery = (id) =>
    useQuery({
      queryKey: ["user", id],
      queryFn: () => api.get(`/users/${id}`).then((res) => res.user),
      staleTime: 1000 * 60 * 5,
      onError: (err) => {
        console.log(err);
        throw new Error(err.message || "Failed to fetch user");
      },
    });

  // Create User mutation
  const createUser = useMutation({
    mutationFn: (data) => api.post("/users", data),
    enabled: canAdd,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create User");
    },
  });

  // Update User mutation
  const updateUser = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/users/${id}`, data),
    enabled: canEdit,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update User");
    },
  });

  // Delete User mutation
  const deleteUser = useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    enabled: canDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete User");
    },
  });

  // change password
  const changePassword = useMutation({
    mutationFn: ({ id, currentPassword, newPassword, confirmNewPassword }) =>
      api.patch(`/users/${id}/password`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    enabled: onlyAdmin,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to change password");
    },
  });

  return {
    usersQuery,
    createUser,
    updateUser,
    deleteUser,
    getUserQuery,
    changePassword,
    permissions: {
      canView,
      canAdd,
      canDelete,
      canEdit,
      onlyAdmin,
    },
  };
};
