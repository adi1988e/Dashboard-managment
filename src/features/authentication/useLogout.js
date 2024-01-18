import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cookies, removeCookie] = useCookies(["token"]);

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(cookies.token),
    onSuccess: () => {
      queryClient.removeQueries();
      removeCookie("token");
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
