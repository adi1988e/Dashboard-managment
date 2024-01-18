import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory as createEditCategoryApi } from "../../services/apiCategories";
import { toast } from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: createEditCategoryApi,
    onSuccess: (category) => {
      toast.success("Category successfully created! ");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategory, isCreating };
}
