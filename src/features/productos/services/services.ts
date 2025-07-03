import type { Producto, CreateProductoData, UpdateProductoData } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchProductos(): Promise<Producto[]> {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function fetchProducto(id: number): Promise<Producto> {
  const res = await fetch(`${API_URL}/productos/${id}`);
  if (!res.ok) throw new Error('Error al obtener producto');
  return res.json();
}

export async function crearProducto(data: CreateProductoData): Promise<Producto> {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function editarProducto(id: number, data: UpdateProductoData): Promise<Producto> {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al editar producto');
  return res.json();
}

export async function eliminarProducto(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
}

export async function subirImagenProducto(id: number, file: File): Promise<{ filePath: string }> {
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`${API_URL}/productos/${id}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error al subir imagen');
  return res.json();
}

export async function fetchProductosPorCategoria(categoriaId: number): Promise<Producto[]> {
  const res = await fetch(`${API_URL}/productos/categoria/${categoriaId}`);
  if (!res.ok) throw new Error('Error al filtrar por categoría');
  return res.json();
}

export async function buscarProductosPorNombre(nombre: string): Promise<Producto[]> {
  const res = await fetch(`${API_URL}/productos/buscar/${encodeURIComponent(nombre)}`);
  if (!res.ok) throw new Error('Error al buscar productos');
  return res.json();
}

export async function fetchProductosFiltrados({ categoriaId, nombre, precioMin, precioMax }: { categoriaId?: number, nombre?: string, precioMin?: number, precioMax?: number }): Promise<Producto[]> {
  const params = new URLSearchParams();
  if (categoriaId) params.append('categoriaId', categoriaId.toString());
  if (nombre) params.append('nombre', nombre);
  if (precioMin !== undefined) params.append('precioMin', precioMin.toString());
  if (precioMax !== undefined) params.append('precioMax', precioMax.toString());
  const query = params.toString();
  const res = await fetch(`${API_URL}/productos/filtros${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Error al filtrar productos');
  return res.json();
}

export async function verificarStock(id: number, cantidad: number = 1): Promise<boolean> {
  const res = await fetch(`${API_URL}/productos/stock/${id}?cantidad=${cantidad}`);
  if (!res.ok) throw new Error('Error al verificar stock');
  const data = await res.json();
  // El backend puede devolver { stock: true/false } o true/false directamente
  if (typeof data === 'boolean') return data;
  if (typeof data === 'object' && 'stock' in data) return data.stock;
  return false;
} 