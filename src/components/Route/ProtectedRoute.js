import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../subs/Loader";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element: Element, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.users
  );

  return (
    <>
      {isAuthenticated ? (
        !loading && user ? (
          <Element />
        ) : (
          <Loader />
        )
      ) : (
        (toast("Login to access"), (<Navigate to="/auth" replace />))
      )}
    </>
  );
};

export default ProtectedRoute;
