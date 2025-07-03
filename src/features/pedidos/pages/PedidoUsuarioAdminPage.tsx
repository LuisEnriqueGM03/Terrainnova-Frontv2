import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsuarios } from '../../usuarios/hooks/hooks';
import { usePedidosUsuarioAdmin } from '../hooks/hooks';
import AdminPedidosList from '../components/AdminPedidosList';
import { slugify } from '../../../shared/utils/slugify';

const PedidoUsuarioAdminPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: usuarios, isLoading: loadingUsuarios } = useUsuarios();

  const usuario = usuarios?.find(u => slugify(u.email.split('@')[0]) === slug);
  const userId = usuario?.id;

  const { data: pedidos, isLoading, error, refetch } = usePedidosUsuarioAdmin(userId);

  const pedidosOrdenados = (pedidos || []).slice().sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  return (
    <div className="admin-layout">

      <div className="admin-main">

        <div className="container py-4">
          <button className="btn btn-volver-usuarios mb-3" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Volver a usuarios
          </button>
          <h2 className="mb-4">
            Pedidos de {usuario ? usuario.nombre : 'Usuario'}
          </h2>
          {loadingUsuarios || isLoading ? (
            <div>Cargando pedidos...</div>
          ) : error ? (
            <div className="text-danger">Error al cargar pedidos</div>
          ) : !usuario ? (
            <div className="text-danger">Usuario no encontrado</div>
          ) : pedidosOrdenados.length === 0 ? (
            <div className="usuario-sin-pedidos-alert">
              <i className="bi bi-x-circle usuario-sin-pedidos-icon"></i>
              Este usuario no tiene pedidos.
            </div>
          ) : (
            <AdminPedidosList pedidos={pedidosOrdenados} onRefresh={refetch} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidoUsuarioAdminPage; 