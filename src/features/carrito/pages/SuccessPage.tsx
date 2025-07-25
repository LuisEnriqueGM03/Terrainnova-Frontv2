import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from "react-router-dom";
import { getPedidoByPaymentIntent } from '../services/stripeServices';
import { useCarrito } from '../context';

const MAX_ATTEMPTS = 15; // 15 intentos x 2s = 30 segundos

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const { clear } = useCarrito();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const fetchPedido = async () => {
      if (!paymentIntentId) {
        setError('No se encontró el pago.');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const pedido = await getPedidoByPaymentIntent(paymentIntentId);
        setPedido(pedido);
        setError(null);
        setLoading(false);
        clear();
      } catch (err: any) {
        if (attempts < MAX_ATTEMPTS) {
          timeout = setTimeout(() => setAttempts(a => a + 1), 2000); // Reintenta en 2 segundos
        } else {
          setError('No se encontró el pedido para este pago. Si el problema persiste, contacta soporte.');
          setLoading(false);
        }
      }
    };

    fetchPedido();

    return () => clearTimeout(timeout);
  }, [paymentIntentId, attempts]);

  return (
    <>
      <Helmet>
        <title>¡Pago exitoso! | Terrainnova</title>
        <meta name="description" content="¡Gracias por tu compra! Tu pedido ha sido procesado correctamente en Terrainnova. Consulta el resumen de tu pedido o sigue comprando productos ecológicos." />
        <meta property="og:title" content="¡Pago exitoso! | Terrainnova" />
        <meta property="og:description" content="¡Gracias por tu compra! Tu pedido ha sido procesado correctamente en Terrainnova. Consulta el resumen de tu pedido o sigue comprando productos ecológicos." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/success" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¡Pago exitoso! | Terrainnova" />
        <meta name="twitter:description" content="¡Gracias por tu compra! Tu pedido ha sido procesado correctamente en Terrainnova. Consulta el resumen de tu pedido o sigue comprando productos ecológicos." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <div className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
          <div className="card p-5 shadow-lg" style={{ maxWidth: 520, borderRadius: 24, background: '#f6fff8' }}>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success mb-3" role="status" />
                <div>Procesando tu pedido...</div>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : pedido ? (
              <>
                <div className="text-center mb-4">
                  <i className="bi bi-check-circle-fill" style={{ fontSize: 48, color: '#22c55e' }}></i>
                  <h1 className="mt-3" style={{ color: '#166534', fontWeight: 700, fontSize: '2rem' }}>¡Gracias por tu compra!</h1>
                  <div className="text-muted mb-2">Tu pedido ha sido procesado correctamente.</div>
                </div>
                <section className="mb-3" aria-label="Resumen del pedido">
                  <h2 className="fw-bold mb-2" style={{ fontSize: '1.2rem' }}>Resumen del pedido</h2>
                  <div><b>ID de pedido:</b> {pedido.id}</div>
                  <div><b>Estado:</b> {pedido.estado}</div>
                  <div><b>Fecha:</b> {new Date(pedido.fecha).toLocaleString('es-BO')}</div>
                  <div><b>Total pagado:</b> Bs. {Number(pedido.total).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</div>
                  <div className="mt-3">
                    <b>Productos:</b>
                    <ul style={{ paddingLeft: 18 }}>
                      {pedido.items?.map((item: any) => (
                        <li key={item.id}>
                          {item.producto?.nombre} x{item.cantidad} <span style={{ color: '#888' }}>(Bs. {Number(item.precio).toLocaleString('es-BO', { minimumFractionDigits: 2 })})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pedido-envio-info mt-4 d-flex align-items-center gap-2">
                    <i className="bi bi-truck pedido-envio-icon"></i>
                    <span>Tu pedido se enviará dentro de los próximos días</span>
                  </div>
                </section>
                <div className="success-btns d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
                  <Link to="/catalogo" className="btn success-btn">
                    Seguir comprando
                  </Link>
                  <Link to="/mis-pedidos" className="btn success-btn-outline">
                    Ver mis pedidos
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default SuccessPage; 