import { useMutation } from "@tanstack/react-query";
import { createEditManager as createEditManagerApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useCreateManager() {
  const { mutate: createManager, isLoading: isCreating } = useMutation({
    mutationFn: createEditManagerApi,
    onSuccess: (user) => {
      toast.success("Account successfully created!");
    },
  });

  return { createManager, isCreating };
}
