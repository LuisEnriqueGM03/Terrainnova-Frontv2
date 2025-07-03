import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/style.css";
import logo from "../../assets/logo.webp";
import avatarImg from "../../assets/profile.webp";
import { useAuth } from '../../features/auth/context';
import { useCarritoStats } from "../../features/carrito/hooks/hooks";
import ToastifyLoginRequired from '../components/ToastifyLoginRequired';
import { toast } from 'react-toastify';
import { useSearch } from '../context/SearchContext';

 // Imagen de ejemplo

const Navbar: React.FC = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { cantidadTotal } = useCarritoStats();
  const { query, setQuery } = useSearch();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCarritoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!usuario) {
      toast(<ToastifyLoginRequired />, {
        style: {
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px #0001',
          border: '3px solid #e53935'
        },
        icon: false
      });
      navigate('/login');
      return;
    }
    navigate('/carrito');
  };

  React.useEffect(() => {
    if (!showSearch) return;
    function handleClick(e: MouseEvent) {
      if (window.innerWidth > 991) return;
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSearch]);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar py-2" role="navigation" aria-label="main navigation">
      <div className="container d-flex align-items-center position-relative" style={{ minHeight: 64 }}>
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Terrainnova Logo" className="navbar-logo me-2" />
            <strong>Terrainnova</strong>
          </Link>
        </div>
        {/* Contenedor de lupa y hamburguesa SOLO en móvil/tablet */}
        <div className="d-flex align-items-center d-lg-none position-absolute" style={{ top: 8, right: 16, gap: 32, width: 'auto' }}>
          <button
            className="btn btn-link p-0 border-0"
            style={{ fontSize: '1.3rem', color: '#fff', zIndex: 1051 }}
            onClick={() => setShowSearch(true)}
            title="Buscar"
            tabIndex={0}
          >
            <i className="bi bi-search"></i>
          </button>
          <button 
            className="navbar-toggler ms-2" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            style={{ fontSize: '1.3rem' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 w-100 justify-content-center text-center">
            <li className="nav-item w-100 d-lg-none text-center">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item w-100 d-lg-none text-center">
              <Link className="nav-link" to="/catalogo">Productos</Link>
            </li>
            <li className="nav-item w-100 d-lg-none text-center">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            {/* Desktop nav links */}
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link" to="/catalogo">Productos</Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3" style={{ marginRight: 0 }}>
            <li className="nav-item">
              <div className="nav-link search-container d-none d-lg-block position-relative p-0">
                <form role="search" className="d-flex align-items-center" style={{ minWidth: 32 }} onSubmit={e => e.preventDefault()}>
                  <button
                    className="btn btn-link p-0 border-0"
                    onClick={() => {
                      if (showSearch) setQuery("");
                      setShowSearch(!showSearch);
                    }}
                    title={showSearch ? "Cerrar" : "Buscar"}
                    tabIndex={0}
                    style={{ zIndex: 2 }}
                    type="button"
                  >
                    <i className={`bi ${showSearch ? 'bi-x-lg' : 'bi-search'}`}></i>
                  </button>
                  <input
                    type="search"
                    className={`form-control search-expand ms-2 ${showSearch ? 'expanded' : ''}`}
                    placeholder="Buscar productos..."
                    style={{
                      width: showSearch ? 220 : 0,
                      opacity: showSearch ? 1 : 0,
                      transition: 'width 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s',
                      paddingLeft: showSearch ? 36 : 0,
                      paddingRight: showSearch ? 36 : 0,
                      border: showSearch ? '1.5px solid #e0e0e0' : 'none',
                      background: '#f8f8f8',
                      position: 'relative',
                      zIndex: 1
                    }}
                    autoFocus={showSearch}
                    tabIndex={showSearch ? 0 : -1}
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value);
                      if (window.location.pathname !== '/catalogo') {
                        navigate('/catalogo');
                      }
                    }}
                  />
                  {showSearch && (
                    <button className="btn btn-principal btn-sm ms-2 position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 3 }} tabIndex={0} type="submit">
                      <i className="bi bi-search"></i>
                    </button>
                  )}
                </form>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/carrito" title="Carrito" onClick={handleCarritoClick}>
                <i className="bi bi-cart"></i>
                {cantidadTotal > 0 && (
                  <span style={{ position: 'absolute', top: 2, right: 2, background: '#27ae60', color: '#fff', borderRadius: '50%', fontSize: 13, minWidth: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, zIndex: 2 }}>
                    {cantidadTotal}
                  </span>
                )}
              </Link>
            </li>
            {/* Usuario autenticado */}
            {usuario ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title={usuario.nombre}
                >
                  <img
                    src={avatarImg}
                    alt="avatar"
                    style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", marginRight: 8 }}
                  />
                  {/* Nombre solo en móvil/tablet */}
                  <span className="d-lg-none ms-1 fw-semibold" style={{ fontSize: 15 }}>
                    {usuario.nombre}
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-0 navbar-user-dropdown">
                  <li className="px-3 py-3 text-center border-bottom">
                    <img
                      src={avatarImg}
                      alt="avatar"
                      className="navbar-user-avatar"
                    />
                    <div className="navbar-user-name">{usuario.nombre}</div>
                  </li>
                  {usuario.rol === 'admin' && (
                    <li className="p-2 border-bottom">
                      <Link to="/admin/dashboard" className="btn btn-principal w-100 mb-1">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="p-2">
                    <Link to="/mis-pedidos" className="btn btn-principal w-100 mb-1">
                      <i className="bi bi-box-seam me-2"></i>Ver mis pedidos
                    </Link>
                  </li>
                  <li className="p-2">
                    <button className="btn btn-principal w-100 navbar-user-logout" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title="Usuario"
                >
                  <i className="bi bi-person"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end navbar-user-dropdown">
                  <li>
                    <Link className="navbar-user-dropdown-item" to="/login">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-user-dropdown-item" to="/registro">
                      <i className="bi bi-person-plus me-2"></i>
                      Registrar
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Overlay flotante para móvil/tablet SIEMPRE fuera del menú */}
      {showSearch && (
        <div className="search-overlay d-lg-none">
          <div className="search-float-box" ref={searchContainerRef}>
            <form role="search" className="d-flex align-items-center w-100" onSubmit={e => e.preventDefault()}>
              <button
                className="btn btn-link p-0 border-0"
                onClick={() => setShowSearch(false)}
                title="Cerrar"
                tabIndex={0}
                style={{ zIndex: 2 }}
                type="button"
              >
                <i className="bi bi-x-lg"></i>
              </button>
              <input
                type="search"
                className="form-control search-expand expanded mx-2"
                placeholder="Buscar productos..."
                autoFocus
              />
              <button className="btn btn-principal btn-sm" tabIndex={0} type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
