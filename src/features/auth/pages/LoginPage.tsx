import React, { useState } from "react";
import logo from "../../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import "../../../shared/style/style.css";
import wonder1 from "../../../assets/wonder1.webp";
import { useLoginMutation } from '../hooks/hooks';
import { useAuth } from '../context';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
  sub: number;
  rol: string;
  nombre?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, error } = useLoginMutation();
  const { setAuth } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    mutate({ email, password }, {
      onSuccess: (res) => {
        // Decodificar el token para obtener el usuario real
        const decoded = jwtDecode<JwtPayload>(res.access_token);
        setAuth({
          id: decoded.sub,
          nombre: decoded.nombre || '',
          email: decoded.email,
          rol: decoded.rol || '',
        }, res.access_token, res.refresh_token);
        if (decoded.rol === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      },
      onError: (err: any) => {
        setLoginError(err.message || 'Error al iniciar sesión');
      }
    });
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Izquierda: Formulario */}
        <div className="login-form-side">
          <div className="mb-4 text-center">
            <img src={logo} alt="Logo de Terrainnova" className="login-logo" loading="lazy" />
          </div>
          <h1 className="login-title">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="login-desc">Por favor ingresa tus datos para continuar.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {(loginError || status === "error") && (
              <div className="login-error">{loginError || (error as Error)?.message}</div>
            )}
            <button
              type="submit"
              className="btn btn-principal w-100 mb-3"
              style={{ borderRadius: 24, fontSize: 18, fontWeight: 600, padding: "12px 0" }}
              disabled={status === "pending"}
            >
              {status === "pending" ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <div className="login-register-link">
            ¿No tienes cuenta? <Link to="/registro" className="text-principal">Regístrate</Link>
          </div>
        </div>
        {/* Derecha: Imagen */}
        <div className="login-img-side">
          <img src={wonder1} alt="Ilustración de bienvenida a Terrainnova" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 