import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, children }:any) => {
    if (!isAuth) {
      return <Navigate to="/SignIn" replace />;
    }
  
    return children;
  };