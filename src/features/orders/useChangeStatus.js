import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../../services/apiOrders";
import { toast } from "react-hot-toast";

export function useChangeStatus() {
  const queryClient = useQueryClient();

  const { mutate: editStatus, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, value }) => changeStatus({ id, value }),
    onSuccess: () => {
      toast.success("Status successfully edited");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editStatus };
}
