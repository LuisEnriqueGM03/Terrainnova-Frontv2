import React from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pago cancelado | Terrainnova</title>
        <meta name="description" content="El pago fue cancelado o no se completó. Vuelve al carrito o sigue explorando productos en Terrainnova." />
        <meta property="og:title" content="Pago cancelado | Terrainnova" />
        <meta property="og:description" content="El pago fue cancelado o no se completó. Vuelve al carrito o sigue explorando productos en Terrainnova." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/cancel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pago cancelado | Terrainnova" />
        <meta name="twitter:description" content="El pago fue cancelado o no se completó. Vuelve al carrito o sigue explorando productos en Terrainnova." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <div className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
          <section className="card p-5 shadow-lg" style={{ maxWidth: 420, borderRadius: 24, background: '#fff6f6' }}>
            <div className="text-center mb-4">
              <i className="bi bi-x-circle-fill" style={{ fontSize: 48, color: '#ef4444' }}></i>
              <h1 className="mt-3" style={{ color: '#b91c1c', fontWeight: 700, fontSize: '2rem' }}>Pago cancelado</h1>
              <div className="text-muted mb-2">Tu pago no se completó o fue cancelado.</div>
            </div>
            <div className="d-flex gap-2 mt-4 justify-content-center">
              <Link to="/carrito" className="btn btn-danger" style={{ borderRadius: 14, fontWeight: 600 }}>Volver al carrito</Link>
              <Link to="/catalogo" className="btn btn-outline-danger" style={{ borderRadius: 14, fontWeight: 600 }}>Seguir comprando</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CancelPage; 