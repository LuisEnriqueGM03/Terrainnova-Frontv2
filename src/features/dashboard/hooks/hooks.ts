import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../services/services';
import { useAuth } from '../../auth/context';

export function useDashboardStats() {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => {
      if (!accessToken) throw new Error('No autenticado');
      return fetchDashboardStats(accessToken);
    },
    enabled: !!accessToken,
  });
} 