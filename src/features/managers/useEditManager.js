import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditManager } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useEditManager() {
  const queryClient = useQueryClient();

  const { mutate: editManager, isLoading: isEditing } = useMutation({
    mutationFn: ({ newManagerData, id }) =>
      createEditManager(newManagerData, id),
    onSuccess: () => {
      toast.success("Manager successfully edited");
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editManager };
}
