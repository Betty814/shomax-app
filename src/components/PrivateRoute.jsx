import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminAccessModal from "../pages/admin/AdminAccessModal";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [modalOpen, setModalOpen] = useState(false);
  const [redirect, setRedirect] = useState(false); // New state for redirect

  useEffect(() => {
    if (token && role !== "admin") {
      setModalOpen(true);
    }
  }, [token, role]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <AdminAccessModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setRedirect(true); // Only redirect after user acknowledges the modal
        }}
      />
      {role === "admin" ? children : null}
    </>
  );
};

export default PrivateRoute;
