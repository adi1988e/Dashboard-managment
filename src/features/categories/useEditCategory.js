import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory } from "../../services/apiCategories";
import { toast } from "react-hot-toast";

export function useEditCategory() {
  const queryClient = useQueryClient();

  const { mutate: editCategory, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCategoryName, id }) =>
      createEditCategory(newCategoryName, id),
    onSuccess: () => {
      toast.success("Category successfully edited");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCategory };
}
