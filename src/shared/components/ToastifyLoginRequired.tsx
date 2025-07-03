import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ToastifyLoginRequired: React.FC = () => (
  <section role="alert" aria-live="assertive" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span aria-hidden="true" style={{
      background: '#e53935',
      borderRadius: 8,
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <FaExclamationTriangle size={28} color="#fff" />
    </span>
    <div>
      <div style={{ fontWeight: 700, fontSize: 17, color: '#111' }}>Inicia sesión</div>
      <div style={{ fontSize: 15, color: '#111', opacity: 0.85 }}>
        Tienes que loguearte para añadir al carrito
      </div>
    </div>
  </section>
);

export default ToastifyLoginRequired; 