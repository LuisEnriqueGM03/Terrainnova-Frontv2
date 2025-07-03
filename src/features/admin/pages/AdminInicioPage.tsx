import React from "react";
import { Helmet } from 'react-helmet-async';

const AdminInicioPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Panel de Administración | Terrainnova</title>
        <meta name="description" content="Panel de administración de Terrainnova. Accede a resúmenes y widgets del sistema." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Panel de Administración | Terrainnova" />
        <meta property="og:description" content="Panel de administración de Terrainnova. Accede a resúmenes y widgets del sistema." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Panel de Administración | Terrainnova" />
        <meta name="twitter:description" content="Panel de administración de Terrainnova. Accede a resúmenes y widgets del sistema." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <h1 className="mb-4">Bienvenido al Panel de Administración</h1>
        <div className="alert alert-info">Aquí puedes ver un resumen y widgets del sistema.</div>
      </main>
    </>
  );
};

export default AdminInicioPage; 