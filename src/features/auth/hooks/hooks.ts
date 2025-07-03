import { useMutation } from '@tanstack/react-query';
import { loginService, registerService } from '../services/services';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/types.ts';

export function useLoginMutation() {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: loginService,
  });
}

export function useRegisterMutation() {
  return useMutation<any, Error, RegisterDto>({
    mutationFn: registerService,
  });
} 