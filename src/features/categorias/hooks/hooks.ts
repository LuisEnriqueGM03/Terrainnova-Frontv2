import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategorias, crearCategoria, editarCategoria, eliminarCategoria } from '../services/services';

export function useCategorias() {
  return useQuery({ queryKey: ['categorias'], queryFn: fetchCategorias });
}

export function useCrearCategoria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });
}

export function useEditarCategoria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, nombre }: { id: number; nombre: string }) => editarCategoria(id, nombre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });
}

export function useEliminarCategoria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });
} 