import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Usuario, AuthResponse } from './types/types';

interface AuthState {
  usuario: Usuario | null;
  access_token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  usuario: null,
  access_token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{ usuario: Usuario; access_token: string; refresh_token: string }>) {
      state.usuario = action.payload.usuario;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    logout(state) {
      state.usuario = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
