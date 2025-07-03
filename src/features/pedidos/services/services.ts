import type { Pedido } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchPedidosUsuario(token: string, userId: number): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/pedidos/usuario/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return res.json();
}

export async function fetchPedidosAdmin(token: string): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/pedidos/admin/todos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener pedidos (admin)');
  const data = await res.json();
  return data.pedidos || data;
}

export async function updatePedidoEstado(token: string, pedidoId: number, estado: string): Promise<Pedido> {
  const res = await fetch(`${API_URL}/pedidos/${pedidoId}/estado`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error('Error al actualizar estado del pedido');
  return res.json();
}

export async function fetchPedidosUsuarioAdmin(token: string, userId: number): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/pedidos/usuario/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener pedidos del usuario');
  return res.json();
} 