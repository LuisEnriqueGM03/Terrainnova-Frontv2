import React from "react";
import { Helmet } from 'react-helmet-async';
import DashboardManager from "../../dashboard/components/DashboardManager";

const AdminDashboardPanelPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard de administración | Terrainnova</title>
        <meta name="description" content="Panel de dashboard para administración de Terrainnova. Visualiza métricas, estadísticas y resúmenes del sistema." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Dashboard de administración | Terrainnova" />
        <meta property="og:description" content="Panel de dashboard para administración de Terrainnova. Visualiza métricas, estadísticas y resúmenes del sistema." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard de administración | Terrainnova" />
        <meta name="twitter:description" content="Panel de dashboard para administración de Terrainnova. Visualiza métricas, estadísticas y resúmenes del sistema." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <DashboardManager />
      </main>
    </>
  );
};

export default AdminDashboardPanelPage; 