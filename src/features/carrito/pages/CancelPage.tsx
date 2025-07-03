import React from "react";
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="card p-5 shadow-lg" style={{ maxWidth: 420, borderRadius: 24, background: '#fff6f6' }}>
        <div className="text-center mb-4">
          <i className="bi bi-x-circle-fill" style={{ fontSize: 48, color: '#ef4444' }}></i>
          <h2 className="mt-3" style={{ color: '#b91c1c', fontWeight: 700 }}>Pago cancelado</h2>
          <div className="text-muted mb-2">Tu pago no se completó o fue cancelado.</div>
        </div>
        <div className="d-flex gap-2 mt-4 justify-content-center">
          <Link to="/carrito" className="btn btn-danger" style={{ borderRadius: 14, fontWeight: 600 }}>Volver al carrito</Link>
          <Link to="/catalogo" className="btn btn-outline-danger" style={{ borderRadius: 14, fontWeight: 600 }}>Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage; 