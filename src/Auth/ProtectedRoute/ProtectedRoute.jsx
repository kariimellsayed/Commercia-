import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token); // Check for token
  const userRole = useSelector((state) => state.auth.userRole); // Check for user role
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Current Location

  useEffect(() => {
    // عند تحديث userRole أو token
    if (token && userRole) {
      setIsLoading(false);
    }
  }, [token, userRole]);

  if (isLoading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  if (userRole && userRole.includes("Admin")) {
    return <Outlet key={location.pathname} />;
  } else if (userRole) {
    return <Navigate to="/404" replace />; // Redirect to 404 if user is not an admin
  }

  return null;
}

export default ProtectedRoute;
