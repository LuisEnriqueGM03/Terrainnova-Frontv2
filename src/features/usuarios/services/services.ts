import type { Usuario } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function updatePerfilUsuario(token: string, data: { direccion: string; telefono: string }): Promise<any> {
  const res = await fetch(`${API_URL}/usuarios/perfil/me`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar perfil');
  return res.json();
} 