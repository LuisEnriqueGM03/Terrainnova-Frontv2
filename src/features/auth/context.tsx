import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario } from '../usuarios/types/types';
import { jwtDecode } from 'jwt-decode';
import { refreshTokenService } from './services/services';

interface AuthContextType {
  usuario: Usuario | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (usuario: Usuario, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
  });
  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
  });
  const [loading, setLoading] = useState(true);

  // Refresca el token si está expirado al cargar
  useEffect(() => {
    async function checkAndRefresh() {
      if (accessToken) {
        try {
          const decoded: any = jwtDecode(accessToken);
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp < now && refreshToken) {
            // Token expirado, intenta refrescar
            try {
              const res = await refreshTokenService(refreshToken);
              setAccessToken(res.access_token);
              return;
            } catch {
              setUsuario(null);
              setAccessToken(null);
              setRefreshToken(null);
            }
          }
        } catch {
          setUsuario(null);
        }
      }
      setLoading(false);
    }
    checkAndRefresh();
    // eslint-disable-next-line
  }, []);

  // Decodifica el usuario del token cuando cambia el accessToken
  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<any>(accessToken);
        setUsuario({
          id: decoded.sub,
          nombre: decoded.nombre || '',
          email: decoded.email,
          rol: decoded.rol || '',
        });
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
      localStorage.setItem('accessToken', accessToken);
    } else {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
    }
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshToken');
    }
  }, [accessToken, refreshToken]);

  const setAuth = (usuario: Usuario, accessToken: string, refreshToken: string) => {
    setUsuario(usuario);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    // Limpiar carrito al hacer logout
    localStorage.removeItem('carrito');
    
    setUsuario(null);
    setAccessToken(null);
    setRefreshToken(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ usuario, accessToken, refreshToken, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}; 