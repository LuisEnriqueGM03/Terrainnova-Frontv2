import React from "react";
import { Helmet } from 'react-helmet-async';
import CategoriaManager from "../../categorias/components/CategoriaManager";

const AdminCategoriasPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Administrar categorías | Terrainnova</title>
        <meta name="description" content="Panel de administración para gestionar categorías en Terrainnova. Agrega, edita o elimina categorías de productos." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Administrar categorías | Terrainnova" />
        <meta property="og:description" content="Panel de administración para gestionar categorías en Terrainnova. Agrega, edita o elimina categorías de productos." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin/categorias" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Administrar categorías | Terrainnova" />
        <meta name="twitter:description" content="Panel de administración para gestionar categorías en Terrainnova. Agrega, edita o elimina categorías de productos." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <CategoriaManager />
      </main>
    </>
  );
};

export default AdminCategoriasPage; 