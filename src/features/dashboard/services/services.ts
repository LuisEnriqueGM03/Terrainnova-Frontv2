const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchDashboardStats(accessToken: string) {
  const res = await fetch(`${API_URL}/admin/dashboard-stats`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener estadísticas del dashboard');
  return res.json();
} 