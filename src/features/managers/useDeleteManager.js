import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteManager as deleteManagerApi } from "../../services/apiAuth";

export function useDeleteManager() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteManager } = useMutation({
    mutationFn: deleteManagerApi,
    onSuccess: () => {
      toast.success("Manager successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteManager };
}
