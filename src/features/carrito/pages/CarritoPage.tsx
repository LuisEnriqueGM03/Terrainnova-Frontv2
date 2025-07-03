import React, { useState, useEffect } from "react";
import { useCarritoContext, useCarritoCantidad, useCarritoStats } from "../hooks/hooks";
import { useAuth } from "../../auth/context";
import { Link, useNavigate } from "react-router-dom";
import { checkoutStripe } from "../services/services";
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripePayment } from '../hooks/useStripePayment';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ToastifyLoginRequired from '../../../shared/components/ToastifyLoginRequired';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CarritoPage: React.FC = () => {
  const { items, removeItem, loading: carritoLoading, carritoId } = useCarritoContext();
  const { incrementarCantidad, decrementarCantidad } = useCarritoCantidad();
  const { total, isEmpty } = useCarritoStats();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const { clientSecret, loading: stripeLoading, error: stripeError, createPayment } = useStripePayment();

  useEffect(() => {
    if (!usuario) {
      toast(<ToastifyLoginRequired />, {
        style: {
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px #0001',
          border: '3px solid #e53935'
        },
        icon: false
      });
      navigate('/login');
    }
  }, [usuario, navigate]);

  // Debug: mostrar items en consola
  useEffect(() => {
    console.log('Carrito items:', items);
    console.log('Items con cantidades:', items.map(item => ({
      id: item.productoId,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio
    })));
  }, [items]);

  const handleShowStripe = async () => {
    if (!carritoId) return;
    await createPayment(Math.round(total * 100), carritoId); // Stripe espera el monto en centavos
    setShowStripe(true);
  };

  if (carritoLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando carrito...</span>
          </div>
          <p className="mt-3">Cargando tu carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Carrito a la izquierda */}
        <div className="col-12 col-lg-7">
          <h2 className="mb-4">Carrito de compras</h2>
          {isEmpty ? (
            <div className="carrito-vacio">
              <div className="carrito-vacio-content">
                <i className="bi bi-cart-x carrito-vacio-icon"></i>
                <span className="carrito-vacio-text">Tu carrito está vacío.</span>
              </div>
              <Link to="/catalogo" className="carrito-vacio-btn">¡Explora nuestros productos!</Link>
            </div>
          ) : (
            <div className="list-group mb-4" style={{ border: 'none', background: 'transparent' }}>
              <AnimatePresence>
                {items.map(item => {
                  const cantidad = Number(item.cantidad) || 1;
                  const precio = Number(item.precio) || 0;
                  return (
                    <motion.div
                      key={item.productoId}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.25 }}
                      className="carrito-item"
                    >
                      <div className="carrito-item-info">
                        {item.imagenUrl && (
                          <img
                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${item.imagenUrl}`}
                            alt={item.nombre}
                            className="carrito-item-img carrito-item-img-lg"
                          />
                        )}
                        <div className="carrito-item-details">
                          <div className="carrito-item-nombre">{item.nombre}</div>
                          <div className="carrito-item-precio">Bs. {precio.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                      <div className="carrito-item-controls">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          className="carrito-btn-cantidad"
                          onClick={() => decrementarCantidad(item.productoId)}
                          disabled={cantidad <= 1}
                        >
                          -
                        </motion.button>
                        <input
                          type="number"
                          className="carrito-input-cantidad"
                          value={cantidad}
                          min={1}
                          readOnly
                        />
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          className="carrito-btn-cantidad"
                          onClick={() => {
                            if (cantidad >= (item.stock || Infinity)) {
                              toast(
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  <div style={{
                                    background: '#fbbf24',
                                    borderRadius: 8,
                                    padding: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <FaExclamationTriangle size={28} color="#fff" style={{ filter: 'drop-shadow(0 0 2px #fbbf24)' }} />
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: 17, color: '#111' }}>Stock insuficiente</div>
                                    <div style={{ fontSize: 15, color: '#111', opacity: 0.85 }}>
                                      Solo hay {item.stock} unidades en stock
                                    </div>
                                  </div>
                                </div>,
                                {
                                  style: {
                                    background: '#fff',
                                    borderRadius: 16,
                                    boxShadow: '0 2px 12px #0001',
                                    border: '3px solid #fbbf24'
                                  },
                                  icon: false
                                }
                              );
                              return;
                            }
                            incrementarCantidad(item.productoId);
                          }}
                        >
                          +
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.08, rotate: -8 }}
                          whileTap={{ scale: 0.92 }}
                          className="carrito-btn-eliminar"
                          onClick={() => removeItem(item.productoId)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
        {/* Resumen y Stripe a la derecha */}
        <div className="col-12 col-lg-5">
          <div className="carrito-resumen-card">
            <h4 className="mb-3">Resumen</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span className="fw-bold">Bs. {total.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</span>
            </div>
            <hr />
            {usuario ? (
              <>
                {!showStripe ? (
                  <>
                    <button
                      className="btn btn-principal w-100 py-3"
                      style={{ fontSize: 18, borderRadius: 16, fontWeight: 600 }}
                      disabled={isEmpty || !!loading}
                      onClick={handleShowStripe}
                    >
                      {stripeLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Preparando pago seguro...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-credit-card me-2"></i>
                          Pagar con tarjeta
                        </>
                      )}
                    </button>
                    {stripeError && <div className="alert alert-danger mt-2">{stripeError}</div>}
                    <div className="text-muted mt-2" style={{ fontSize: 14 }}>
                      <i className="bi bi-shield-check me-1"></i>
                      Tu pago es 100% seguro y encriptado con Stripe.
                    </div>
                  </>
                ) : (
                  clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripeCheckoutForm clientSecret={clientSecret} onSuccess={() => setShowStripe(false)} />
                      <button
                        className="btn btn-outline-secondary w-100 mt-3"
                        style={{ borderRadius: 14, fontWeight: 600 }}
                        onClick={() => setShowStripe(false)}
                        type="button"
                      >
                        Cancelar y volver al resumen
                      </button>
                    </Elements>
                  )
                )}
              </>
            ) : (
              <div className="alert alert-warning text-center">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Debes <Link to="/login">iniciar sesión</Link> para pagar con Stripe.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage; 