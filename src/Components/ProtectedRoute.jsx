import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { authenticatedUser, checkingAuth } = useAuth();

  if (checkingAuth) {
    return <div>Checking authentication...</div>;
  }

  if (!authenticatedUser?.name) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
