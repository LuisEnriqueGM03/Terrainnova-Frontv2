import React from "react";
import { Helmet } from 'react-helmet-async';
import UsuarioManager from "../../usuarios/components/UsuarioManager";

const AdminUsuariosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Administrar usuarios | Terrainnova</title>
        <meta name="description" content="Panel de administración para gestionar usuarios en Terrainnova. Visualiza, edita o elimina usuarios de la plataforma." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Administrar usuarios | Terrainnova" />
        <meta property="og:description" content="Panel de administración para gestionar usuarios en Terrainnova. Visualiza, edita o elimina usuarios de la plataforma." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin/usuarios" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Administrar usuarios | Terrainnova" />
        <meta name="twitter:description" content="Panel de administración para gestionar usuarios en Terrainnova. Visualiza, edita o elimina usuarios de la plataforma." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main className="container-fluid">
        <UsuarioManager />
      </main>
    </>
  );
};

export default AdminUsuariosPage; 