import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCustomer as deleteCustomerApi } from "../../services/apiAuth";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCustomer } = useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      toast.success("successfully deleted user");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCustomer };
}
