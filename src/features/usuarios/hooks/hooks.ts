import { useQuery } from '@tanstack/react-query';
import { fetchUsuarios } from '../services/services';

export function useUsuarios() {
  return useQuery({ queryKey: ['usuarios'], queryFn: fetchUsuarios });
} 