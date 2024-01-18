import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useCookies } from "react-cookie";

export function useUser() {
  const queryClient = useQueryClient();
  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(token),
    onSuccess: (data) => {
      setCookie("token", data.token, { path: "/", maxAge: 10800 });
      queryClient.setQueryData(["user"], data.manager);
    },
  });
  return { isLoading, user, isAuthenticated: user };
}
