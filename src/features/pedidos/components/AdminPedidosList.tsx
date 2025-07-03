import React, { useState } from 'react';
import type { Pedido } from '../types/types';
import ModalDetallePedido from './ModalDetallePedido';

interface AdminPedidosListProps {
  pedidos: Pedido[];
  onRefresh?: () => void;
}

const estadoConfig: Record<string, { color: string; icon: string; badgeText: string; badgeIcon: string }> = {
  confirmado: {
    color: 'var(--color-gris, #95a5a6)',
    icon: 'bi-patch-check',
    badgeText: 'Confirmado',
    badgeIcon: 'bi-patch-check',
  },
  entregado: {
    color: 'var(--color-success, #28a745)',
    icon: 'bi-truck',
    badgeText: 'Entregado',
    badgeIcon: 'bi-truck',
  },
  rechazado: {
    color: 'var(--color-danger, #e74c3c)',
    icon: 'bi-x-circle',
    badgeText: 'Rechazado',
    badgeIcon: 'bi-x-circle',
  },
  pendiente: {
    color: 'var(--color-info, #17a2b8)',
    icon: 'bi-hourglass-split',
    badgeText: 'Pendiente',
    badgeIcon: 'bi-hourglass-split',
  },
};

const getEstadoConfig = (estado: string) => {
  const key = estado.toLowerCase();
  return estadoConfig[key] || {
    color: 'var(--color-secondary, #6c757d)',
    icon: 'bi-question-circle',
    badgeText: estado,
    badgeIcon: 'bi-question-circle',
  };
};

const AdminPedidosList: React.FC<AdminPedidosListProps> = ({ pedidos, onRefresh }) => {
  const [modalPedido, setModalPedido] = useState<{ open: boolean; pedido: Pedido | null }>({ open: false, pedido: null });

  const handleVerDetalle = (pedido: Pedido) => {
    setModalPedido({ open: true, pedido });
  };

  const handleCloseModal = () => {
    setModalPedido({ open: false, pedido: null });
    if (onRefresh) onRefresh();
  };

  return (
    <section>
      <div className="d-flex flex-column gap-4">
        {pedidos.map(pedido => {
          const estado = getEstadoConfig(pedido.estado);
          return (
            <article 
              key={pedido.id} 
              className="pedido-admin-card"
              style={{ borderColor: estado.color }}
              onClick={() => handleVerDetalle(pedido)}
            >
              <div className="pedido-admin-card-content">
                <div className="pedido-admin-card-icon" style={{ color: estado.color, borderColor: estado.color }}>
                  <i className={`bi ${estado.icon}`}></i>
                </div>
                <div className="pedido-admin-card-info">
                  <div className="pedido-admin-card-title" style={{ color: estado.color }}>
                    Pedido #{pedido.id}
                  </div>
                  <div className="pedido-admin-card-meta">
                    {pedido.usuario?.nombre || 'Sin nombre'}
                    <span className="mx-2">•</span>
                    {new Date(pedido.fecha).toLocaleDateString()}
                  </div>
                </div>
                <div className="pedido-admin-card-actions">
                  <span 
                    className="pedido-admin-card-badge" 
                    style={{ background: estado.color }}
                  >
                    <i className={`bi ${estado.badgeIcon} me-1`}></i>
                    {estado.badgeText}
                  </span>
                  <button
                    className="pedido-admin-card-btn"
                    style={{ borderColor: estado.color, color: estado.color }}
                    title="Ver detalle"
                    onClick={e => { e.stopPropagation(); handleVerDetalle(pedido); }}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <ModalDetallePedido
        open={modalPedido.open}
        pedido={modalPedido.pedido}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default AdminPedidosList; 