// Tipos para pedidos y sus items

export interface PedidoItem {
  id: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl?: string;
  };
  cantidad: number;
  precio: number;
}

export interface Pedido {
  id: number;
  usuario: {
    id: number;
    nombre?: string;
    email?: string;
    direccion?: string;
    telefono?: string;
  };
  total: number;
  estado: string;
  payment_intent_id?: string;
  fecha: string;
  items: PedidoItem[];
} 