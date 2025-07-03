import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminContent from "../components/AdminContent";

const AdminDashboardPage: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth >= 992 ? 280 : 80);

  useEffect(() => {
    function handleResize() {
      setSidebarWidth(window.innerWidth >= 992 ? 280 : 80);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="admin-layout d-flex">
      <AdminSidebar />
      <div 
        className="admin-main flex-grow-1 d-flex flex-column"
        style={{ marginLeft: sidebarWidth }}
      >
        <AdminHeader />
        <main className="admin-content flex-grow-1 p-4">
          <AdminContent />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 