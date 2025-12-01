import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/services/authService";

interface PrivateRouteProps {
  element: React.ReactNode;
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }
  
  return element;
}