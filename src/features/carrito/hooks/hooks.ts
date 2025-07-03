import { useCarrito } from '../context';
import type { CarritoItem } from '../context';

// Hook principal para acceder al carrito
export const useCarritoContext = () => {
  return useCarrito();
};

// Hook para añadir productos al carrito
export const useAddToCarrito = () => {
  const { addItem, items } = useCarrito();
  
  const addToCarrito = (producto: {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl?: string;
    stock?: number;
  }, cantidad: number = 1) => {
    const item: CarritoItem = {
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      cantidad,
      stock: producto.stock,
    };
    
    addItem(item);
  };
  
  return { addToCarrito, items };
};

// Hook para gestionar cantidades
export const useCarritoCantidad = () => {
  const { updateCantidad, removeItem, items } = useCarrito();
  
  const incrementarCantidad = (productoId: number) => {
    const item = items.find(i => i.productoId === productoId);
    if (item) {
      const nuevaCantidad = item.cantidad + 1;
      if (!item.stock || nuevaCantidad <= item.stock) {
        updateCantidad(productoId, nuevaCantidad);
      }
    }
  };
  
  const decrementarCantidad = (productoId: number) => {
    const item = items.find(i => i.productoId === productoId);
    if (item && item.cantidad > 1) {
      updateCantidad(productoId, item.cantidad - 1);
    } else if (item && item.cantidad === 1) {
      removeItem(productoId);
    }
  };
  
  const cambiarCantidad = (productoId: number, cantidad: number) => {
    if (cantidad > 0) {
      updateCantidad(productoId, cantidad);
    } else {
      removeItem(productoId);
    }
  };
  
  return {
    incrementarCantidad,
    decrementarCantidad,
    cambiarCantidad,
  };
};

// Hook para obtener estadísticas del carrito
export const useCarritoStats = () => {
  const { items, total } = useCarrito();
  
  const cantidadTotal = items.reduce((sum, item) => sum + (item.cantidad || 0), 0);
  const cantidadProductos = items.length;
  
  return {
    cantidadTotal,
    cantidadProductos,
    total,
    isEmpty: items.length === 0,
  };
};

// Hook para verificar si un producto está en el carrito
export const useProductoEnCarrito = (productoId: number) => {
  const { items } = useCarrito();
  
  const item = items.find(i => i.productoId === productoId);
  
  return {
    estaEnCarrito: !!item,
    cantidad: item?.cantidad || 0,
    item,
  };
};

// Hook para limpiar carrito al logout
export const useCarritoLogout = () => {
  const { clear } = useCarrito();
  
  const limpiarCarritoLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('carrito');
    // Limpiar estado del carrito
    clear();
  };
  
  return { limpiarCarritoLogout };
}; 