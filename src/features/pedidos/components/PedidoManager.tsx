import React from 'react';
import { usePedidosAdmin } from '../hooks/hooks';
import AdminPedidosList from './AdminPedidosList';
import { useSearch } from '../../../shared/context/SearchContext';

const PedidoManager: React.FC = () => {
  const { data: pedidos, isLoading, error, refetch } = usePedidosAdmin();
  const { query } = useSearch();
  const pedidosFiltrados = pedidos?.filter(pedido =>
    pedido.id.toString().includes(query)
  );

  return (
    <section>
      <h1 className="mb-4">Pedidos</h1>
      {/* Aquí podrías agregar un formulario o botón para crear pedidos si lo necesitas */}
      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : error ? (
        <div className="text-danger">Error al cargar pedidos</div>
      ) : (
        <AdminPedidosList pedidos={pedidosFiltrados || []} onRefresh={refetch} />
      )}
    </section>
  );
};

export default PedidoManager; 