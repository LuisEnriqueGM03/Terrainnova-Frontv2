import React from 'react';
import { Helmet } from 'react-helmet-async';
import PedidoManager from '../../pedidos/components/PedidoManager';

const AdminPedidosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Administrar pedidos | Terrainnova</title>
        <meta name="description" content="Panel de administración para gestionar pedidos en Terrainnova. Visualiza, edita o gestiona los pedidos de los clientes." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Administrar pedidos | Terrainnova" />
        <meta property="og:description" content="Panel de administración para gestionar pedidos en Terrainnova. Visualiza, edita o gestiona los pedidos de los clientes." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/admin/pedidos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Administrar pedidos | Terrainnova" />
        <meta name="twitter:description" content="Panel de administración para gestionar pedidos en Terrainnova. Visualiza, edita o gestiona los pedidos de los clientes." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main className="container-fluid">
        <PedidoManager />
      </main>
    </>
  );
};

export default AdminPedidosPage; 