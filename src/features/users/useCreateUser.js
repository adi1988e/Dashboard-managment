import { useMutation } from "@tanstack/react-query";
import { createEditUser as createEditUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useCreateUser() {
  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: createEditUserApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
    },
  });

  return { createUser, isCreating };
}
