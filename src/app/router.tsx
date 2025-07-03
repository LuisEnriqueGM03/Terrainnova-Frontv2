import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import AdminDashboardPage from "../features/admin/pages/AdminPage";
import AdminInicioPage from "../features/admin/pages/AdminInicioPage";
import AdminCategoriasPage from "../features/admin/pages/AdminCategoriasPage";
import AdminProductosPage from "../features/admin/pages/AdminProductosPage";
import AdminUsuariosPage from "../features/admin/pages/AdminUsuariosPage";
import CatalogoProductosPage from "../features/productos/pages/CatalogoProductosPage";
import ProductoDetailPage from "../features/productos/pages/ProductoDetailPage";
import CarritoPage from "../features/carrito/pages/CarritoPage";
import SuccessPage from "../features/carrito/pages/SuccessPage";
import CancelPage from "../features/carrito/pages/CancelPage";
import { useAuth } from '../features/auth/context';
import PedidosUsuarioPage from '../features/pedidos/pages/PedidosUsuarioPage';
import AdminPedidosPage from '../features/admin/pages/AdminPedidosPage';
import AdminDashboardPanelPage from '../features/admin/pages/AdminDashboardPanelPage';
import PedidoUsuarioAdminPage from '../features/admin/pages/PedidoUsuarioAdminPage';
import NosotrosPage from "../features/nosotros/pages/NosotrosPage";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();
  if (loading) return null;
  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/registro" element={<RegisterPage />} />
    <Route path="/admin" element={
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    }>
      <Route index element={<AdminInicioPage />} />
      <Route path="productos" element={<AdminProductosPage />} />
      <Route path="categorias" element={<AdminCategoriasPage />} />
      <Route path="usuarios" element={<AdminUsuariosPage />} />
      <Route path="/admin/pedidos" element={<AdminPedidosPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPanelPage />} />
      <Route path="/admin/pedido-usuario/:slug" element={<PedidoUsuarioAdminPage />} />
    </Route>
    <Route path="/catalogo" element={<CatalogoProductosPage />} />
    <Route path="/producto/:slug" element={<ProductoDetailPage />} />
    <Route path="/carrito" element={<CarritoPage />} />
    <Route path="/success" element={<SuccessPage />} />
    <Route path="/cancel" element={<CancelPage />} />
    <Route path="/mis-pedidos" element={<PedidosUsuarioPage />} />
    <Route path="/nosotros" element={<NosotrosPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default Router;
