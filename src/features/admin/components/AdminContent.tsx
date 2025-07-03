import React from "react";
import { Outlet } from "react-router-dom";

const AdminContent: React.FC = () => {
  return <main><Outlet /></main>;
};

export default AdminContent; 