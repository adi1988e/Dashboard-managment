import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiAuth";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("successfully deleted user");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
