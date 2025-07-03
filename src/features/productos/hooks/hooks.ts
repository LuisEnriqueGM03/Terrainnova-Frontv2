import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchProductos, 
  fetchProducto, 
  crearProducto, 
  editarProducto, 
  eliminarProducto,
  subirImagenProducto 
} from '../services/services';
import type { UpdateProductoData } from '../types/types';

export function useProductos() {
  return useQuery({ queryKey: ['productos'], queryFn: fetchProductos });
}

export function useProducto(id: number) {
  return useQuery({ 
    queryKey: ['productos', id], 
    queryFn: () => fetchProducto(id),
    enabled: !!id 
  });
}

export function useCrearProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}

export function useEditarProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductoData }) => editarProducto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}

export function useEliminarProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}

export function useSubirImagenProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => subirImagenProducto(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
} 