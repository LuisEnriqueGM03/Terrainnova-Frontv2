import React, { useState } from "react";
import logo from "../../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import "../../../shared/style/style.css";
import wonder1 from "../../../assets/wonder1.webp";
import { useRegisterMutation } from '../hooks/hooks';

const RegisterPage: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, error } = useRegisterMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    mutate({ nombre, email, password }, {
      onSuccess: () => {
        setRegisterSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
      onError: (err: any) => {
        setRegisterError(err.message || 'Error al registrarse');
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
          <h1 className="login-title">Crea tu cuenta</h1>
          <p className="login-desc">¡Bienvenido! Completa los datos para registrarte.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre"
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
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
            {(registerError || status === "error") && (
              <div className="login-error">{registerError || (error as Error)?.message}</div>
            )}
            {(registerSuccess || status === "success") && (
              <div className="text-success mb-3 text-center">¡Registro exitoso! Redirigiendo...</div>
            )}
            <button
              type="submit"
              className="btn btn-principal w-100 mb-3"
              style={{ borderRadius: 24, fontSize: 18, fontWeight: 600, padding: "12px 0" }}
              disabled={status === "pending"}
            >
              {status === "pending" ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
          <div className="login-register-link">
            ¿Ya tienes cuenta? <Link to="/login" className="text-principal">Inicia sesión</Link>
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

export default RegisterPage; 