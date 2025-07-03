import React, { useEffect, useState } from 'react';
import { fetchProductos } from '../../productos/services/services';
import type { Producto } from '../../productos/types/types';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../../shared/utils/slugify';

const shuffleArray = (array: Producto[]) => {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const ProductosDestacados: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos().then((data) => {
      setProductos(shuffleArray(data).slice(0, 3));
    });
  }, []);

  return (
    <section className="productos-destacados-section">
      <h2 className="productos-destacados-title">Productos destacados</h2>
      <div className="productos-destacados-grid">
        {productos.map((producto) => (
          <div className="producto-destacado-card" key={producto.id}>
            <div className="producto-destacado-img-wrapper">
              <img
                src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${producto.imagenUrl?.replace(/\.(jpg|jpeg|png)$/, '.webp')}`}
                alt={producto.nombre}
                className="producto-destacado-img"
                loading="lazy"
              />
            </div>
            <div className="producto-destacado-info">
              <h3 className="producto-destacado-nombre">{producto.nombre}</h3>
              <div className="producto-destacado-precio">Bs. {Number(producto.precio).toFixed(2)}</div>
              <button
                className="producto-destacado-btn"
                onClick={() => navigate(`/producto/${slugify(producto.nombre)}`)}
              >
                Ver producto
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosDestacados; 