import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

type AuthRouteProps = {
  children: React.ReactNode;
  isPrivate: boolean;
};

export function AuthRoute({ children, isPrivate }: AuthRouteProps) {
  const { token } = useAuthContext();

  if (!token && isPrivate) {
    return <Navigate to="/signin" replace={true} />;
  }

  if (token && !isPrivate) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <>{children}</>;
}
