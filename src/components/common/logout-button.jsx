import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;
