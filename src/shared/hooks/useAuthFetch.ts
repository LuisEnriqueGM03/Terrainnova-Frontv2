import { useAuth } from '../../features/auth/context';

export function useAuthFetch() {
  const { accessToken } = useAuth();

  return async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error('Error en la petición');
    return res.json();
  };
} 