import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>Iniciar sesión | Terrainnova</title>
        <meta name="description" content="Accede a tu cuenta de Terrainnova para comprar productos ecológicos y sostenibles. ¡Únete a nuestra comunidad!" />
        <meta property="og:title" content="Iniciar sesión | Terrainnova" />
        <meta property="og:description" content="Accede a tu cuenta de Terrainnova para comprar productos ecológicos y sostenibles. ¡Únete a nuestra comunidad!" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/login" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iniciar sesión | Terrainnova" />
        <meta name="twitter:description" content="Accede a tu cuenta de Terrainnova para comprar productos ecológicos y sostenibles. ¡Únete a nuestra comunidad!" />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <div className="login-bg">
          <div className="login-container">
            {/* Izquierda: Formulario */}
            <section className="login-form-side" aria-label="Formulario de inicio de sesión">
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
            </section>
            {/* Derecha: Imagen */}
            <aside className="login-img-side" aria-label="Imagen de bienvenida">
              <img src={wonder1} alt="Ilustración de bienvenida a Terrainnova" />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage; 