import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AuthContext } from "../contexts/authContext";

interface ProtectedRouteProps {
  children: React.ReactElement;
}


//Protected route/context to check if user is logged in
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
