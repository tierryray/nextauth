import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

type UserCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles } : UserCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return false;

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission =>  user.permissions.includes(permission));

    if (!hasAllPermissions) return false;
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(permission =>  user.roles.includes(permission));

    if (!hasAllRoles) return false;
  }

  return true;
}