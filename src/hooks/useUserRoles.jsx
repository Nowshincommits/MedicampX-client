import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "@/Contexts/AuthContext/AuthContext";

const useUserRoles = () => {
  const axiosSecure = useAxiosSecure();

  const { user, roleLoading: authRoleLoading } = useContext(AuthContext);

  const {
    data: role,
    isLoading: roleLoading,
    error: roleError,
  } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !!user?.email && !authRoleLoading,

    queryFn: async () => {
      console.log("Fetching role for:", user.email);

      const res = await axiosSecure.get(`/users/role/${user.email}`);

      console.log("Role API response:", res.data);

      return res.data.role;
    },

    staleTime: 0,
  });

  console.log("USER:", user?.email);
  console.log("AUTH ROLE LOADING:", authRoleLoading);
  console.log("ROLE:", role);
  console.log("ROLE LOADING:", roleLoading);
  console.log("ROLE ERROR:", roleError);

  return {
    role,
    roleLoading: roleLoading || authRoleLoading,
    roleError,
  };
};

export default useUserRoles;