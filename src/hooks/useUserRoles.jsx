import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useUserRoles = () => {
  const axiosSecure = useAxiosSecure();
  const { user, roleLoading: authRoleLoading } = use();
  const { data: role = "participant", isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !authRoleLoading, 
    queryFn: async () => {
      // gettign the user
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
    staleTime: 1000 * 60 * 5, 
  });

  return { role, roleLoading, authRoleLoading, refetch };
};

export default useUserRoles;
