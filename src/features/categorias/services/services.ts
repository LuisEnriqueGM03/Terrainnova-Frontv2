import type { Categoria } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchCategorias(): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
}

export async function crearCategoria(nombre: string): Promise<Categoria> {
  const res = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function editarCategoria(id: number, nombre: string): Promise<Categoria> {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });
  if (!res.ok) throw new Error('Error al editar categoría');
  return res.json();
}

export async function eliminarCategoria(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar categoría');
} 