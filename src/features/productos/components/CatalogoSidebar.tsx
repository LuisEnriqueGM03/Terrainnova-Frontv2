import React, { useEffect, useState } from "react";
import { fetchCategorias } from "../../categorias/services/services";
import type { Categoria } from "../../categorias/types/types";

interface CatalogoSidebarProps {
  onFiltrar: (filtros: { categoriaId?: number, nombre?: string, precioMin?: number, precioMax?: number }) => void;
  onLimpiar: () => void;
}

const CatalogoSidebar: React.FC<CatalogoSidebarProps> = ({ onFiltrar, onLimpiar }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionada, setSeleccionada] = useState<number | undefined>(undefined);
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState<string>("");
  const [precioMax, setPrecioMax] = useState<string>("");

  useEffect(() => {
    fetchCategorias().then(cats => {
      setCategorias(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleRadio = (id?: number) => {
    setSeleccionada(id);
  };

  const handleFiltrar = () => {
    onFiltrar({
      categoriaId: seleccionada,
      nombre: busqueda.trim() || undefined,
      precioMin: precioMin ? Number(precioMin) : undefined,
      precioMax: precioMax ? Number(precioMax) : undefined
    });
  };

  const handleLimpiar = () => {
    setSeleccionada(undefined);
    setBusqueda("");
    setPrecioMin("");
    setPrecioMax("");
    onLimpiar();
  };

  return (
    <aside
      className="catalogo-sidebar p-4 bg-white rounded-4 shadow-sm"
      style={{ minWidth: 260, maxWidth: 320, width: '100%' }}
    >
      <section aria-labelledby="catalogo-buscar-label">
        <h2 id="catalogo-buscar-label" className="fw-bold mb-3" style={{ fontSize: '1.2rem' }}>Buscar</h2>
        <label htmlFor="catalogo-buscar-input" className="visually-hidden">Buscar producto</label>
        <input
          type="text"
          id="catalogo-buscar-input"
          className="form-control mb-4"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </section>
      <section aria-labelledby="catalogo-categoria-label">
        <h2 id="catalogo-categoria-label" className="fw-bold mb-4" style={{ fontSize: '1.2rem' }}>Categoría</h2>
        <div className="mb-4">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              id="cat-todos"
              checked={seleccionada === undefined}
              onChange={() => handleRadio(undefined)}
            />
            <label className="form-check-label" htmlFor="cat-todos">Todos</label>
          </div>
          {loading ? (
            <div className="text-muted">Cargando categorías...</div>
          ) : (
            categorias.map(cat => (
              <div className="form-check mb-2" key={cat.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoria"
                  id={`cat-${cat.id}`}
                  checked={seleccionada === cat.id}
                  onChange={() => handleRadio(cat.id)}
                />
                <label className="form-check-label" htmlFor={`cat-${cat.id}`}>{cat.nombre}</label>
              </div>
            ))
          )}
        </div>
      </section>
      <section aria-labelledby="catalogo-precio-label">
        <h3 id="catalogo-precio-label" className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>Rango de precio</h3>
        <div className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <label htmlFor="precio-min" className="visually-hidden">Precio mínimo</label>
            <input
              type="number"
              id="precio-min"
              className="form-control form-control-sm me-2"
              placeholder="Mín"
              value={precioMin}
              onChange={e => setPrecioMin(e.target.value)}
              min={0}
              style={{ width: 70 }}
            />
            <span className="mx-1">-</span>
            <label htmlFor="precio-max" className="visually-hidden">Precio máximo</label>
            <input
              type="number"
              id="precio-max"
              className="form-control form-control-sm ms-2"
              placeholder="Máx"
              value={precioMax}
              onChange={e => setPrecioMax(e.target.value)}
              min={0}
              style={{ width: 70 }}
            />
          </div>
        </div>
      </section>
      <button
        className="btn btn-principal w-100 mb-2"
        style={{ borderRadius: 16, fontWeight: 600, background: 'var(--color-principal)', color: '#fff', fontSize: 17, padding: '0.9em 0' }}
        onClick={handleFiltrar}
      >
        Filtrar
      </button>
      <button
        className="btn btn-outline-secondary w-100"
        style={{ borderRadius: 16 }}
        onClick={handleLimpiar}
        type="button"
      >
        Limpiar filtros
      </button>
      <style>{`
        @media (max-width: 1024px) {
          .catalogo-sidebar {
            min-width: 0 !important;
            max-width: 30vw !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 12px !important;
          }
        }
        @media (max-width: 768px) {
          .catalogo-sidebar {
            min-width: 0 !important;
            max-width: 88vw !important;
            width: 90vw !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default CatalogoSidebar; 