import React, { useState } from 'react';
import type { Pedido } from '../types/types';
import { useAuth } from '../../auth/context';
import { updatePedidoEstado } from '../services/services';

interface ModalDetallePedidoProps {
  open: boolean;
  pedido: Pedido | null;
  onClose: () => void;
}

const estadoBtnConfig = [
  {
    estado: 'confirmado',
    color: 'var(--color-gris, #95a5a6)',
    icon: 'bi-patch-check',
    label: 'Confirmado',
  },
  {
    estado: 'rechazado',
    color: 'var(--color-danger, #e74c3c)',
    icon: 'bi-x-circle',
    label: 'Rechazado',
  },
  {
    estado: 'entregado',
    color: 'var(--color-success, #28a745)',
    icon: 'bi-truck',
    label: 'Entregado',
  },
];

const getEstadoTheme = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'entregado':
      return {
        color: 'var(--color-success, #28a745)',
        icon: 'bi-truck',
      };
    case 'rechazado':
      return {
        color: 'var(--color-danger, #e74c3c)',
        icon: 'bi-x-circle',
      };
    case 'confirmado':
      return {
        color: 'var(--color-gris, #95a5a6)',
        icon: 'bi-patch-check',
      };
    default:
      return {
        color: 'var(--color-secondary, #6c757d)',
        icon: 'bi-question-circle',
      };
  }
};

const ModalDetallePedido: React.FC<ModalDetallePedidoProps> = ({ open, pedido, onClose }) => {
  const { accessToken } = useAuth();
  const [loadingEstado, setLoadingEstado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pedidoActual, setPedidoActual] = useState<Pedido | null>(pedido);

  React.useEffect(() => {
    setPedidoActual(pedido);
    setError(null);
    setLoadingEstado(null);
  }, [pedido]);

  if (!open || !pedidoActual) return null;

  const theme = getEstadoTheme(pedidoActual.estado);

  const getEstadoIcon = (estado: string) => getEstadoTheme(estado).icon;

  const handleActualizarEstado = async (nuevoEstado: string) => {
    if (!accessToken || !pedidoActual) return;
    setLoadingEstado(nuevoEstado);
    setError(null);
    try {
      const actualizado = await updatePedidoEstado(accessToken, pedidoActual.id, nuevoEstado);
      setPedidoActual(actualizado);
      setLoadingEstado(null);
    } catch (err: any) {
      setError('Error al actualizar el estado');
      setLoadingEstado(null);
    }
  };

  return (
    <div className="modal-pedido-overlay">
      <div className="modal-pedido-dialog">
        <div className="modal-pedido-content">
          <div className="modal-pedido-header" style={{ background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color} 100%)` }}>
            <h2 className="modal-pedido-title" style={{ color: '#fff', margin: 0, fontSize: '1.3rem' }}>
              <i className={`bi bi-receipt me-2`} style={{ color: '#fff' }}></i>
              Pedido #{pedidoActual.id}
            </h2>
            <button 
              type="button" 
              className="modal-pedido-close" 
              onClick={onClose}
              style={{ color: '#fff' }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="modal-pedido-body">
            {/* Información del pedido */}
            <div className="pedido-info-section">
              <div className="pedido-info-grid">
                <div className="pedido-info-card" style={{ borderTop: `4px solid ${theme.color} !important` }}>
                  <div className="pedido-info-icon" style={{ background: theme.color, boxShadow: `0 0 0 2px ${theme.color}` }}>
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="pedido-info-content">
                    <h6>CLIENTE</h6>
                    <p className="pedido-info-name">{pedidoActual.usuario?.nombre || 'Sin nombre'}</p>
                    <p className="pedido-info-email">{pedidoActual.usuario?.email || 'Sin email'}</p>
                    <span className="pedido-info-id" style={{ background: theme.color }}>{`ID: ${pedidoActual.usuario?.id}`}</span>
                  </div>
                </div>

                <div className="pedido-info-card" style={{ borderTop: `4px solid ${theme.color} !important` }}>
                  <div className="pedido-info-icon" style={{ background: theme.color, boxShadow: `0 0 0 2px ${theme.color}` }}>
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <div className="pedido-info-content">
                    <h6>PEDIDO</h6>
                    <p className="pedido-info-date">{new Date(pedidoActual.fecha).toLocaleString()}</p>
                    <div className="pedido-estado-badge" style={{ background: theme.color }}>
                      <i className={`bi ${getEstadoIcon(pedidoActual.estado)} me-1`}></i>
                      {pedidoActual.estado.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="pedido-info-card" style={{ borderTop: `4px solid ${theme.color} !important` }}>
                  <div className="pedido-info-icon" style={{ background: theme.color, boxShadow: `0 0 0 2px ${theme.color}` }}>
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <div className="pedido-info-content">
                    <h6>TOTAL</h6>
                    <p className="pedido-info-total" style={{ color: theme.color }}>Bs. {Number(pedidoActual.total).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</p>
                    {pedidoActual.payment_intent_id && (
                      <span className="pedido-info-payment">Payment: {pedidoActual.payment_intent_id}</span>
                    )}
                  </div>
                </div>

                {/* Información adicional */}
                {(pedidoActual.usuario?.direccion || pedidoActual.usuario?.telefono) && (
                  <div className="pedido-info-card" style={{ borderTop: `4px solid ${theme.color} !important` }}>
                    <div className="pedido-info-icon" style={{ background: theme.color, boxShadow: `0 0 0 2px ${theme.color}` }}>
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <div className="pedido-info-content">
                      <h6>INFORMACIÓN ADICIONAL</h6>
                      {pedidoActual.usuario?.direccion && (
                        <div className="pedido-info-extra-item mb-1">
                          <i className="bi bi-geo-alt me-2"></i>
                          <span>{pedidoActual.usuario.direccion}</span>
                        </div>
                      )}
                      {pedidoActual.usuario?.telefono && (
                        <div className="pedido-info-extra-item">
                          <i className="bi bi-telephone me-2"></i>
                          <span>{pedidoActual.usuario.telefono}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Productos del pedido */}
            <section className="pedido-productos-section">
              <h3 className="pedido-productos-title" style={{ color: theme.color, borderBottom: `3px solid ${theme.color}`, fontSize: '1.1rem' }}>
                <i className="bi bi-box-seam me-2" style={{ color: theme.color }}></i>
                Productos del Pedido
              </h3>
              <div className="pedido-productos-grid">
                {pedidoActual.items.map((item, index) => (
                  <div key={index} className="pedido-producto-card">
                    <div className="pedido-producto-image">
                      {item.producto.imagenUrl ? (
                        <img 
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${item.producto.imagenUrl}`} 
                          alt={item.producto.nombre}
                          className="pedido-producto-img"
                        />
                      ) : (
                        <div className="pedido-producto-placeholder">
                          <i className="bi bi-image"></i>
                        </div>
                      )}
                    </div>
                    <div className="pedido-producto-info">
                      <h6 className="pedido-producto-name">{item.producto.nombre}</h6>
                      <div className="pedido-producto-details">
                        <span className="pedido-producto-price" style={{ background: theme.color }}>
                          Bs. {Number(item.precio).toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="pedido-producto-quantity">
                          x{item.cantidad}
                        </span>
                      </div>
                      <div className="pedido-producto-subtotal" style={{ color: theme.color }}>
                        Subtotal: Bs. {Number(item.precio * item.cantidad).toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {error && <div className="text-danger mt-3">{error}</div>}
          </div>

          <div className="modal-pedido-footer" style={{ gap: 12, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {estadoBtnConfig.map(btn => (
                <button
                  key={btn.estado}
                  type="button"
                  className="btn"
                  style={{
                    background: btn.color,
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: 12,
                    minWidth: 120,
                    marginLeft: 8,
                    opacity: loadingEstado === btn.estado ? 0.7 : 1,
                    pointerEvents: loadingEstado ? 'none' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                  disabled={loadingEstado !== null}
                  onClick={() => handleActualizarEstado(btn.estado)}
                >
                  <i className={`bi ${btn.icon} me-2`}></i>
                  {btn.label}
                  {loadingEstado === btn.estado && <span className="spinner-border spinner-border-sm ms-2"></span>}
                </button>
              ))}
            </div>
            <button 
              type="button" 
              className="btn btn-principal" 
              style={{ minWidth: 120 }}
              onClick={onClose}
            >
              <i className="bi bi-check-lg me-2"></i>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallePedido; 