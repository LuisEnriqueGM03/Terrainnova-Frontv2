import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { fetchProductos, fetchProducto } from "../services/services";
import { slugify } from "../../../shared/utils/slugify";
import { useAddToCarrito } from "../../carrito/hooks/hooks";
import { toast } from 'react-toastify';
import { FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../auth/context';
import { useNavigate } from 'react-router-dom';
import ToastifyLoginRequired from '../../../shared/components/ToastifyLoginRequired';

const ProductoDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [producto, setProducto] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCarrito, items } = useAddToCarrito();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducto() {
      setLoading(true);
      try {
        // Buscar todos los productos y encontrar el que coincida con el slug
        const productos = await fetchProductos();
        const prod = productos.find((p: any) => slugify(p.nombre) === slug);
        if (prod) {
          // Obtener datos completos por id
          const prodFull = await fetchProducto(prod.id);
          setProducto(prodFull);
        } else {
          setProducto(null);
        }
      } catch {
        setProducto(null);
      } finally {
        setLoading(false);
      }
    }
    loadProducto();
  }, [slug]);

  const [cantidad, setCantidad] = useState(1);

  const handleCantidad = (delta: number) => {
    const itemEnCarrito = items?.find((i: any) => i.productoId === producto.id);
    const cantidadEnCarrito = itemEnCarrito?.cantidad || 0;
    if (delta > 0 && (cantidad + cantidadEnCarrito) >= producto.stock) {
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
              Solo hay {producto.stock} unidades en stock
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
    setCantidad(prev => {
      const nueva = prev + delta;
      return Math.max(1, Math.min(nueva, producto.stock - cantidadEnCarrito));
    });
  };

  if (loading) return <div className="container py-5 text-center">Cargando producto...</div>;
  if (!producto) return <div className="container py-5 text-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
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
      return;
    }
    const itemEnCarrito = items?.find((i: any) => i.productoId === producto.id);
    const cantidadEnCarrito = itemEnCarrito?.cantidad || 0;
    if ((cantidad + cantidadEnCarrito) > producto.stock) {
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
              Solo hay {producto.stock} unidades en stock
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
    addToCarrito(producto, cantidad);
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          background: '#22c55e',
          borderRadius: 8,
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FaShoppingCart size={28} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, color: '#111' }}>Producto añadido</div>
          <div style={{ fontSize: 15, color: '#111', opacity: 0.85 }}>{producto.nombre}</div>
        </div>
      </div>,
      {
        style: {
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px #0001',
          border: '3px solid #22c55e'
        },
        icon: false
      }
    );
  };

  const isSinStock = producto.stock === 0;

  const pageTitle = producto?.nombre ? `${producto.nombre} | Terrainnova` : 'Detalle de producto | Terrainnova';
  const pageDescription = producto?.descripcion ? producto.descripcion.replace(/<[^>]+>/g, '').slice(0, 160) : 'Consulta los detalles, precio y disponibilidad de este producto ecológico en Terrainnova.';
  const pageImage = producto?.imagenUrl ? `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${producto.imagenUrl}` : '/logo.webp';
  const pageUrl = producto?.nombre ? `https://terrainnova.com/producto/${slugify(producto.nombre)}` : 'https://terrainnova.com/producto';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>
      <main>
        <div className="container py-5">
          <div className="row align-items-start g-5">
            {/* Imagen */}
            <figure className="col-12 col-md-5 d-flex justify-content-center align-items-start" style={{ margin: 0 }}>
              <img
                src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${producto.imagenUrl}`}
                alt={producto.nombre}
                className="producto-detail-img"
              />
            </figure>
            {/* Detalles */}
            <section className="col-12 col-md-7">
              <h1 className="producto-detail-titulo">{producto.nombre}</h1>
              <div className="producto-detail-categoria">{producto.categoria?.nombre}</div>
              <div className="producto-detail-precio">Bs. {producto.precio?.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</div>
              <div className="producto-detail-descripcion">
                <article>
                  <div className="editorjs-viewer" dangerouslySetInnerHTML={{ __html: producto.descripcion || '<em>Sin descripción</em>' }} />
                </article>
              </div>
              {isSinStock ? (
                <div style={{ background: '#e53935', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 12, padding: '14px 0', marginTop: 18, marginBottom: 0, textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <i className="bi bi-exclamation-circle-fill" style={{ fontSize: 26, color: '#fff' }}></i>
                  Sin stock
                </div>
              ) : (
                <>
                  <div className="producto-detail-cantidad">
                    <span className="fw-semibold" style={{ fontSize: 17 }}>Cantidad</span>
                    <button className="producto-detail-cantidad-btn" onClick={() => handleCantidad(-1)} disabled={cantidad <= 1}>-</button>
                    <input type="number" className="producto-detail-cantidad-input" value={cantidad} min={1} max={producto.stock} readOnly />
                    <button className="producto-detail-cantidad-btn" onClick={() => handleCantidad(1)}>+</button>
                  </div>
                  <button className="producto-detail-addcart" onClick={handleAddToCart}>
                    Añadir al carrito
                  </button>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductoDetailPage; 