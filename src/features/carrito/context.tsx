import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/context";
import { 
  getCarritoBackend, 
  addItemBackend, 
  updateCantidadBackend, 
  removeItemBackend, 
  clearCarritoBackend 
} from "./services/services";

export interface CarritoItem {
  productoId: number;
  nombre: string;
  precio: number;
  imagenUrl?: string;
  cantidad: number;
  stock?: number;
}

interface CarritoContextType {
  items: CarritoItem[];
  carritoId?: number;
  addItem: (item: CarritoItem) => void;
  removeItem: (productoId: number) => void;
  updateCantidad: (productoId: number, cantidad: number) => void;
  clear: () => void;
  total: number;
  loading: boolean;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [carritoId, setCarritoId] = useState<number | undefined>(undefined);

  // Cargar carrito solo desde backend si autenticado
  useEffect(() => {
    const loadCarrito = async () => {
      setLoading(true);
      try {
        if (usuario && !authLoading) {
          const backendCarrito = await getCarritoBackend();
          setItems(backendCarrito.items);
          setCarritoId(backendCarrito.id);
        } else {
          setItems([]);
          setCarritoId(undefined);
        }
      } catch (error: any) {
        setItems([]);
        setCarritoId(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) {
      loadCarrito();
    }
  }, [usuario, authLoading]);

  const addItem = async (item: CarritoItem) => {
    if (usuario && !authLoading) {
      try {
        await addItemBackend(item);
        const backendItems = await getCarritoBackend();
        setItems(backendItems.items);
        setCarritoId(backendItems.id);
      } catch (error: any) {
        // Manejo de error opcional
      }
    }
  };

  const removeItem = async (productoId: number) => {
    if (usuario && !authLoading) {
      try {
        await removeItemBackend(productoId);
        setItems(prev => prev.filter(i => i.productoId !== productoId));
      } catch (error: any) {
        // Manejo de error opcional
      }
    }
  };

  const updateCantidad = async (productoId: number, cantidad: number) => {
    if (usuario && !authLoading) {
      try {
        await updateCantidadBackend(productoId, cantidad);
        setItems(prev =>
          prev.map(i =>
            i.productoId === productoId ? { ...i, cantidad: Math.max(1, Math.min(cantidad, i.stock ?? Infinity)) } : i
          )
        );
      } catch (error: any) {
        // Manejo de error opcional
      }
    }
  };

  const clear = async () => {
    if (usuario && !authLoading) {
      try {
        await clearCarritoBackend();
        setItems([]);
      } catch (error: any) {
        // Manejo de error opcional
      }
    }
  };

  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ items, carritoId, addItem, removeItem, updateCantidad, clear, total, loading }}>
      {children}
    </CarritoContext.Provider>
  );
};

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
} 