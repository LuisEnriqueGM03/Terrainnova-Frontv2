import React from "react";
import { Helmet } from 'react-helmet-async';
import ProductoManager from "../../productos/components/ProductoManager";

const AdminProductosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Administrar productos | Terrainnova</title>
        <meta name="description" content="Panel de administración para gestionar productos en Terrainnova. Agrega, edita o elimina productos de tu tienda ecológica." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Administrar productos | Terrainnova" />
        <meta property="og:description" content="Panel de administración para gestionar productos en Terrainnova. Agrega, edita o elimina productos de tu tienda ecológica." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin/productos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Administrar productos | Terrainnova" />
        <meta name="twitter:description" content="Panel de administración para gestionar productos en Terrainnova. Agrega, edita o elimina productos de tu tienda ecológica." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main className="container-fluid">
        <ProductoManager />
      </main>
    </>
  );
};

export default AdminProductosPage; 