import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const loginUserContactObjData = useSelector((state) => state?.loginUser?.data);

  return loginUserContactObjData != null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;