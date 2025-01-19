import React from "react";
import { useSelector } from "react-redux";
import UserMenuAuth from "./user-menu-auth";

const UserMenu = () => {
  const { isUserLogin } = useSelector((state) => state.auth);

  return <div className="user-menu">{isUserLogin && <UserMenuAuth />}</div>;
};

export default UserMenu;
