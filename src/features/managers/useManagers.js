import { useQuery } from "@tanstack/react-query";
import { getManagers } from "../../services/apiAuth";

export function useManagers() {
  const {
    isLoading,
    data: managers,
    error,
  } = useQuery({
    queryKey: ["managers"],
    queryFn: getManagers,
  });

  return { isLoading, error, managers };
}
