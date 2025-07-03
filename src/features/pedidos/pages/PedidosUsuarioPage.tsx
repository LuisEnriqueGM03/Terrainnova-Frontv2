import React, { useState } from 'react';
import { usePedidosUsuario } from '../hooks/hooks';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const PedidosUsuarioPage: React.FC = () => {
  const { data: pedidos, isLoading, error } = usePedidosUsuario();
  const [openPedidoId, setOpenPedidoId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenPedidoId(openPedidoId === id ? null : id);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mis pedidos</h1>
      <h2 className="mb-4">Historial de pedidos</h2>
      {isLoading && <div>Cargando pedidos...</div>}
      {error && <div className="text-danger">Error al cargar pedidos</div>}
      {pedidos && pedidos.length === 0 && <div>No tienes pedidos aún.</div>}
      {pedidos && pedidos.length > 0 && (
        <div className="d-flex flex-column gap-4">
          {[...pedidos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map(pedido => (
            <div
              key={pedido.id}
              className={`pedido-card card shadow-sm p-3 ${openPedidoId === pedido.id ? 'open' : ''}`}
              onClick={() => handleToggle(pedido.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="pedido-header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="pedido-id">Pedido #{pedido.id}</span>
                  <span className={`pedido-estado badge ms-2 ${
                    pedido.estado === 'entregado' ? 'bg-success' :
                    pedido.estado === 'rechazado' ? 'bg-danger' :
                    'bg-secondary'
                  }`}>
                    {pedido.estado === 'confirmado' && <i className="bi bi-check2-circle me-1"></i>}
                    {pedido.estado === 'entregado' && <i className="bi bi-truck me-1"></i>}
                    {pedido.estado === 'rechazado' && <i className="bi bi-x-circle me-1"></i>}
                    {pedido.estado}
                  </span>
                </div>
                <i className={`bi ${openPedidoId === pedido.id ? 'bi-chevron-up' : 'bi-chevron-down'} pedido-chevron`}></i>
              </div>
              <div className="pedido-total mt-2"><strong>Total:</strong> Bs. {Number(pedido.total).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</div>
              <div className="pedido-fecha text-muted mt-1">Fecha de compra: {new Date(pedido.fecha).toLocaleString()}</div>
              {openPedidoId === pedido.id && (
                <div className="pedido-detalle mt-3">
                  <div className="pedido-productos-list">
                    {pedido.items.map(item => {
                      const producto: any = item.producto;
                      return (
                        <div key={item.id} className="pedido-producto-item">
                          <div className="pedido-producto-img-wrapper">
                            <picture>
                              <source srcSet={`${producto.imagenUrl.startsWith('http') ? producto.imagenUrl : API_URL + producto.imagenUrl}`.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                              <img src={`${producto.imagenUrl.startsWith('http') ? producto.imagenUrl : API_URL + producto.imagenUrl}`.replace(/\.(jpg|jpeg|png)$/, '.webp')} alt={producto.nombre} className="pedido-producto-img" loading="lazy" />
                            </picture>
                          </div>
                          <div className="pedido-producto-info">
                            <div className="pedido-producto-nombre">{producto.nombre}</div>
                            <div className="pedido-producto-cantidad">Cantidad: {item.cantidad}</div>
                            <div className="pedido-producto-precio">Bs. {Number(item.precio).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosUsuarioPage; 