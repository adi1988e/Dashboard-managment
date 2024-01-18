import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCustomer } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useEditCustomer() {
  const queryClient = useQueryClient();

  const { mutate: editCustomer, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCustomerData, id }) =>
      createEditCustomer(newCustomerData, id),
    onSuccess: () => {
      toast.success("Customer successfully edited");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCustomer };
}
