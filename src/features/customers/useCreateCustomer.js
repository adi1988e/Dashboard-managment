import { useMutation } from "@tanstack/react-query";
import { createEditCustomer as createEditCustomerApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useCreateCustomer() {
  const { mutate: createCustomer, isLoading: isCreating } = useMutation({
    mutationFn: createEditCustomerApi,
    onSuccess: (customer) => {
      toast.success("Account successfully created!");
    },
  });

  return { createCustomer, isCreating };
}
