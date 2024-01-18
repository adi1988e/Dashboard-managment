import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.manager);
      setCookie("token", user.token, { path: "/" });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
