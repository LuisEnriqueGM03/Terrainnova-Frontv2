import { useQuery } from '@tanstack/react-query';
import { fetchPedidosUsuario, fetchPedidosAdmin, fetchPedidosUsuarioAdmin } from '../services/services';
import { useAuth } from '../../auth/context';

export function usePedidosUsuario() {
  const { usuario, accessToken } = useAuth();
  return useQuery({
    queryKey: ['pedidos', usuario?.id],
    queryFn: () => {
      if (!usuario?.id || !accessToken) throw new Error('Usuario no autenticado');
      return fetchPedidosUsuario(accessToken, usuario.id);
    },
    enabled: !!usuario?.id && !!accessToken,
  });
}

export function usePedidosAdmin() {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ['pedidos-admin'],
    queryFn: () => {
      if (!accessToken) throw new Error('No autenticado');
      return fetchPedidosAdmin(accessToken);
    },
    enabled: !!accessToken,
  });
}

export function usePedidosUsuarioAdmin(userId: number | string | undefined) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ['pedidos-usuario-admin', userId],
    queryFn: () => {
      if (!userId || !accessToken) throw new Error('No autenticado o sin usuario');
      return fetchPedidosUsuarioAdmin(accessToken, Number(userId));
    },
    enabled: !!userId && !!accessToken,
  });
} 