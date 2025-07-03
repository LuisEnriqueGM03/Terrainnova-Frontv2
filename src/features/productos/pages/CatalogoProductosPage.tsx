import React, { useState } from "react";
import CatalogoSidebar from "../components/CatalogoSidebar";
import { useProductos } from "../hooks/hooks";
import { fetchProductosFiltrados } from "../services/services";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../shared/utils/slugify";
import { useAddToCarrito } from "../../carrito/hooks/hooks";
import { toast } from 'react-toastify';
import { FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../auth/context';
import ToastifyLoginRequired from '../../../shared/components/ToastifyLoginRequired';
import Footer from '../../../shared/components/Footer';
import { useSearch } from '../../../shared/context/SearchContext';

const CatalogoProductosPage: React.FC = () => {
  const { data: productos, isLoading, error } = useProductos();
  const [openId, setOpenId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState<any[] | null>(null);
  const [cantidadFiltrados, setCantidadFiltrados] = useState<number | undefined>(undefined);
  const [filtrando, setFiltrando] = useState(false);
  const navigate = useNavigate();
  const { addToCarrito, items } = useAddToCarrito();
  const { usuario } = useAuth();
  const { query } = useSearch();

  const handleFiltrar = async (filtros: { categoriaId?: number, nombre?: string, precioMin?: number, precioMax?: number }) => {
    setFiltrando(true);
    try {
      const data = await fetchProductosFiltrados(filtros);
      setProductosFiltrados(data);
      setCantidadFiltrados(data.length);
    } catch {
      setProductosFiltrados([]);
      setCantidadFiltrados(0);
    } finally {
      setFiltrando(false);
    }
  };

  const handleLimpiar = () => {
    setProductosFiltrados(null);
    setCantidadFiltrados(undefined);
  };

  const handleAddToCart = (e: React.MouseEvent, producto: any) => {
    e.stopPropagation();
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
    if (cantidadEnCarrito >= producto.stock) {
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
    addToCarrito(producto, 1);
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

  const productosMostrar = (productosFiltrados !== null ? productosFiltrados : productos)?.filter(p =>
    !query || p.nombre.toLowerCase().includes(query.toLowerCase())
  );
  const cantidadMostrar = cantidadFiltrados !== undefined ? cantidadFiltrados : productos?.length || 0;

  return (
    <>
      <h1 className="catalogo-title" style={{ fontWeight: 900, fontSize: '2.2rem', margin: '1.5rem 0 1.2rem 0', textAlign: 'center', color: 'var(--color-principal, #19410e)' }}>Catálogo de productos</h1>
      <div className="container py-4 d-flex flex-column align-items-center" style={{ minHeight: '100vh', background: '#fff' }}>
        {/* Botón para mostrar/ocultar sidebar en móvil */}
        <div className="d-md-none mb-3 catalogo-btn-filtros-wrapper">
          <button
            className="btn btn-principal catalogo-btn-filtros"
            style={{ borderRadius: 16, fontWeight: 600, background: 'var(--color-principal)', color: '#fff', fontSize: 17, padding: '0.9em 0' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>
        <div className="row gx-4 justify-content-center" style={{ width: '100%' }}>
          {/* Sidebar */}
          <div
            className={`col-12 col-md-4 col-lg-3 mb-4 mb-md-0 sidebar-slide ${sidebarOpen ? 'sidebar-slide-open' : ''}`}
            style={{
              transition: 'max-height 2s cubic-bezier(.4,2,.6,1), opacity 0.6s',
              maxHeight: sidebarOpen || window.innerWidth >= 768 ? 1000 : 0,
              overflow: 'hidden',
            }}
          >
            <CatalogoSidebar
              onFiltrar={handleFiltrar}
              onLimpiar={handleLimpiar}
            />
          </div>
          {/* Grid de productos */}
          <div className="col-12 col-md-8 col-lg-9">
            {/* Mostrar cantidad de productos filtrados */}
            <div className="mb-3 fw-semibold" style={{ fontSize: 18 }}>
              {filtrando ? 'Filtrando...' : `${cantidadMostrar} Producto${cantidadMostrar === 1 ? '' : 's'}`}
            </div>
            {isLoading ? (
              <div className="text-center py-5">Cargando productos...</div>
            ) : error ? (
              <div className="alert alert-danger">Error al cargar productos</div>
            ) : (
              <div className="row">
                {productosMostrar?.map(producto => (
                  <div key={producto.id} className="col-12 col-sm-6 col-lg-4 mb-4">
                    <div
                      className="card h-100 border-0 p-0 overflow-hidden position-relative catalogo-card"
                      style={{ borderRadius: 22, cursor: 'pointer', boxShadow: '0 8px 32px rgba(44, 62, 80, 0.13)', transition: 'box-shadow 0.28s cubic-bezier(.4,2,.6,1), border 0.2s' }}
                      onClick={() => setOpenId(producto.id === openId ? null : producto.id)}
                    >
                      {producto.imagenUrl && (
                        <img
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${producto.imagenUrl}`}
                          alt={producto.nombre}
                          style={{
                            width: '100%',
                            maxWidth: '100%',
                            height: 220,
                            objectFit: 'cover',
                            borderTopLeftRadius: 18,
                            borderTopRightRadius: 18,
                            background: '#fff',
                            display: 'block',
                          }}
                        />
                      )}
                      <div className="card-body d-flex flex-column align-items-start justify-content-center p-4" style={{ textAlign: 'left', minHeight: 160 }}>
                        <div className="fw-bold mb-1" style={{ fontSize: 17, color: '#222', textAlign: 'left' }}>{producto.nombre}</div>
                        <div className="mb-1" style={{ color: '#888', fontSize: 15, fontWeight: 500, textAlign: 'left' }}>{producto.categoria?.nombre || 'Sin categoría'}</div>
                        <div className="fw-bold mb-0" style={{ fontSize: 19, color: '#222', textAlign: 'left', width: '100%' }}>
                          Bs. {producto.precio?.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                        </div>
                        {/* Área de compra desplegable */}
                        <div
                          style={{
                            maxHeight: openId === producto.id ? (producto.stock === 0 ? 120 : 80) : 0,
                            opacity: openId === producto.id ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 0.35s cubic-bezier(.4,2,.6,1), opacity 0.2s',
                            width: '100%',
                            marginTop: openId === producto.id ? (producto.stock === 0 ? 24 : 16) : 0
                          }}
                        >
                          <div className="w-100 d-flex align-items-center justify-content-start gap-2 mt-2">
                            <button
                              className={`btn catalogo-btn-ver ${producto.stock === 0 ? 'w-100' : 'w-75'}`}
                              style={{ borderRadius: 16, fontWeight: 600, fontSize: 16, background: 'var(--color-principal)', color: '#fff', border: 'none', transition: 'background 0.18s, box-shadow 0.18s' }}
                              onClick={e => { e.stopPropagation(); navigate(`/producto/${slugify(producto.nombre)}`); }}
                            >
                              Ver producto
                            </button>
                            {producto.stock === 0 ? null : (
                              <button
                                className="btn d-flex align-items-center justify-content-center catalogo-btn-carrito"
                                style={{ borderRadius: 16, width: 44, height: 44, fontSize: 22, border: '2px solid var(--color-principal)', color: 'var(--color-principal)', background: '#fff', transition: 'border 0.18s, color 0.18s, box-shadow 0.18s' }}
                                onClick={e => handleAddToCart(e, producto)}
                                title="Agregar al carrito"
                              >
                                <i className="bi bi-cart-plus" style={{ color: 'var(--color-principal)' }}></i>
                              </button>
                            )}
                          </div>
                          {producto.stock === 0 && (
                            <div style={{ background: '#e53935', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 10, padding: '10px 0', marginTop: 8, marginBottom: 0, textAlign: 'center', width: '100%' }}>
                              Sin stock
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatalogoProductosPage; 