//NATIVE
//LIBRARIES
import { Navigate } from "react-router-dom";

//COMPONENTS
import { useUserContext } from "../../hooks/user/use-user-context";

//STYLES
//UTILS

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
  requiredRoles: string[];
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo,
  requiredRoles,
}) => {
  const { user } = useUserContext();

  return user && requiredRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};
