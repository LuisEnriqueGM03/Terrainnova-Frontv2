import type { LoginDto, RegisterDto, AuthResponse } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function loginService(data: LoginDto): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Credenciales inválidas');
  return res.json();
}

export async function registerService(data: RegisterDto) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}

export async function refreshTokenService(refreshToken: string): Promise<{ access_token: string }> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) throw new Error('No se pudo refrescar el token');
  return res.json();
} 