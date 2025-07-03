import React from 'react';
import { useDashboardStats } from '../hooks/hooks';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DashboardManager: React.FC = () => {
  const { data, isLoading, error } = useDashboardStats();

  return (
    <div>
      <h1 className="mb-4">Panel de Resumen</h1>
      {isLoading ? (
        <div>Cargando estadísticas...</div>
      ) : error ? (
        <div className="text-danger">Error al cargar estadísticas</div>
      ) : data ? (
        <>
          {/* Cards resumen */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-3">
              <div className="dashboard-card dashboard-card-ganancias text-center h-100">
                <div className="dashboard-card-icon"><i className="bi bi-cash-coin"></i></div>
                <div className="dashboard-card-title">Ganancias hoy</div>
                <div className="dashboard-card-value">Bs. {data.gananciasHoy}</div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="dashboard-card dashboard-card-usuarios text-center h-100">
                <div className="dashboard-card-icon"><i className="bi bi-people-fill"></i></div>
                <div className="dashboard-card-title">Usuarios</div>
                <div className="dashboard-card-value">{data.totalUsuarios}</div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="dashboard-card dashboard-card-confirmados text-center h-100">
                <div className="dashboard-card-icon"><i className="bi bi-card-checklist"></i></div>
                <div className="dashboard-card-title">Pedidos confirmados</div>
                <div className="dashboard-card-value">{data.pedidosConfirmados}</div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="dashboard-card dashboard-card-entregados text-center h-100">
                <div className="dashboard-card-icon"><i className="bi bi-truck"></i></div>
                <div className="dashboard-card-title">Pedidos entregados</div>
                <div className="dashboard-card-value">{data.pedidosEntregados}</div>
              </div>
            </div>
          </div>

          {/* Layout inferior: dos columnas */}
          <div className="row g-4">
            {/* Productos con poco stock */}
            <div className="col-12 col-lg-7">
              <div className="dashboard-card dashboard-card-poco-stock h-100">
                <h4 className="mb-3"><i className="bi bi-exclamation-triangle me-2"></i>Productos con poco stock</h4>
                <div className="row g-3">
                  {data.productosPocoStock.length === 0 ? (
                    <div className="col-12 text-muted">No hay productos con poco stock.</div>
                  ) : (
                    data.productosPocoStock.map((prod: any) => (
                      <div className="col-12 col-md-6" key={prod.id}>
                        <div className={`dashboard-poco-stock-card d-flex flex-row align-items-center p-2 gap-3 ${prod.stock === 0 ? 'dashboard-poco-stock-card-zero' : ''}`}>
                          <picture>
                            <source srcSet={(prod.imagenUrl ? `${API_URL}${prod.imagenUrl}` : '/placeholder.png').replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                            <img
                              src={(prod.imagenUrl ? `${API_URL}${prod.imagenUrl}` : '/placeholder.png').replace(/\.(jpg|jpeg|png)$/, '.webp')}
                              alt={prod.nombre}
                              className="dashboard-poco-stock-img"
                              loading="lazy"
                            />
                          </picture>
                          <div className="flex-grow-1">
                            <div className="dashboard-poco-stock-nombre">{prod.nombre}</div>
                            <div className="dashboard-poco-stock-badges-row">
                              <span className={`dashboard-poco-stock-badge badge ${prod.stock === 0 ? 'dashboard-poco-stock-badge-zero' : ''}`}>Stock: {prod.stock}</span>
                              <span className="badge bg-info">Ventas: {prod.ventas}</span>
                            </div>
                            <div className="dashboard-poco-stock-precio">Bs. {prod.precio}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Producto más vendido */}
            <div className="col-12 col-lg-5">
              <div className="dashboard-card dashboard-card-mas-vendido h-100 d-flex flex-column align-items-center justify-content-center">
                <h4 className="mb-3 w-100 text-center"><i className="bi bi-star-fill me-2"></i>Producto más vendido</h4>
                {data.productoMasVendido ? (
                  <>
                    <picture>
                      <source srcSet={(data.productoMasVendido.imagenUrl ? `${API_URL}${data.productoMasVendido.imagenUrl}` : '/placeholder.png').replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                      <img
                        src={(data.productoMasVendido.imagenUrl ? `${API_URL}${data.productoMasVendido.imagenUrl}` : '/placeholder.png').replace(/\.(jpg|jpeg|png)$/, '.webp')}
                        alt={data.productoMasVendido.nombre}
                        className="dashboard-mas-vendido-img"
                        loading="lazy"
                      />
                    </picture>
                    <div className="dashboard-mas-vendido-nombre">{data.productoMasVendido.nombre}</div>
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      <span className="badge bg-success">Ventas: {data.productoMasVendido.ventas}</span>
                      {data.productoMasVendido.precio && (
                        <span className="badge bg-primary">Bs. {data.productoMasVendido.precio}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-muted">No hay datos de producto más vendido.</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DashboardManager; 