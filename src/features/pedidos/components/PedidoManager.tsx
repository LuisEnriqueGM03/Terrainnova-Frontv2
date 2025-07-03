import React, { useState } from 'react';
import { usePedidosAdmin } from '../hooks/hooks';
import AdminPedidosList from './AdminPedidosList';
import { useSearch } from '../../../shared/context/SearchContext';

const PedidoManager: React.FC = () => {
  const { data: pedidos, isLoading, error, refetch } = usePedidosAdmin();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const { query } = useSearch();
  const pedidosFiltrados = pedidos?.filter(pedido =>
    pedido.id.toString().includes(query)
  );

  return (
    <div>
      <h1 className="mb-4">Pedidos</h1>
      {/* Aquí podrías agregar un formulario o botón para crear pedidos si lo necesitas */}
      {mensaje && <div className="mb-3 text-success">{mensaje}</div>}
      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : error ? (
        <div className="text-danger">Error al cargar pedidos</div>
      ) : (
        <AdminPedidosList pedidos={pedidosFiltrados || []} onRefresh={refetch} />
      )}
    </div>
  );
};

export default PedidoManager; 