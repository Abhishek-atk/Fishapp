import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import AuthPage from "./AuthPage";

const LoginPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking login...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <AuthPage />;
};

export default LoginPage;
