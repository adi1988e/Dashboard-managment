import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrders";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      toast.success("Order successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteOrder };
}
