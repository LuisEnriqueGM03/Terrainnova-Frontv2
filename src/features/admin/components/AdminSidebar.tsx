import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../auth/context';

const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed ? 'true' : 'false');
  }, [isCollapsed]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        setIsCollapsed(false);
      }
    }
    window.addEventListener('resize', handleResize);
    // Ejecutar al montar
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay para móviles SOLO cuando sidebar está ABIERTO */}
      {!isCollapsed && (
        <div 
          className="d-lg-none position-fixed w-100 h-100 bg-dark" 
          style={{ 
            top: 0, 
            left: 0, 
            zIndex: 1040, 
            opacity: 0.5,
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`d-flex flex-column align-items-center bg-dark text-white position-fixed h-100 ${isCollapsed ? 'sidebar-collapsed' : ''}`}
        style={{ 
          width: isCollapsed ? 80 : 280, 
          minHeight: '100vh', 
          padding: isCollapsed ? '24px 0 0 0' : '32px 0',
          zIndex: 1050,
          transition: 'width 0.3s ease, padding 0.3s',
          left: 0,
          top: 0
        }}
      >
        {/* Botón toggle para móviles */}
        <button 
          className="btn btn-outline-light d-lg-none position-absolute"
          style={{ top: 16, right: 16, zIndex: 1060 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
        </button>

        {!isCollapsed && (
          <>
            <img src={logo} alt="Logo de Terrainnova" style={{ width: 60, marginBottom: 8, transition: 'width 0.3s, margin 0.3s' }} />
            <div className="fw-bold mb-4" style={{ letterSpacing: 2, fontSize: 20, textAlign: 'center' }}>TERRAINNOVA</div>
          </>
        )}
        <nav className="flex-grow-1 w-100">
          <ul className="nav flex-column w-100">
            <li className="nav-item" style={isCollapsed ? { marginTop: 56 } : {}}>
              <NavLink
                to="/admin/dashboard"
                end
                className={({ isActive }) =>
                  `nav-link text-white py-3 px-3${isActive ? ' sidebar-active' : ''}`
                }
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                <i className="bi bi-house me-2"></i>
                {!isCollapsed && "Inicio"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/productos"
                className={({ isActive }) =>
                  `nav-link text-white py-3 px-3${isActive ? ' sidebar-active' : ''}`
                }
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                <i className="bi bi-box-seam me-2"></i>
                {!isCollapsed && "Productos"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/categorias"
                className={({ isActive }) =>
                  `nav-link text-white py-3 px-3${isActive ? ' sidebar-active' : ''}`
                }
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                <i className="bi bi-tags me-2"></i>
                {!isCollapsed && "Categorías"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/usuarios"
                className={({ isActive }) =>
                  `nav-link text-white py-3 px-3${isActive ? ' sidebar-active' : ''}`
                }
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                <i className="bi bi-people me-2"></i>
                {!isCollapsed && "Usuarios"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/pedidos"
                className={({ isActive }) =>
                  `nav-link text-white py-3 px-3${isActive ? ' sidebar-active' : ''}`
                }
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                <i className="bi bi-card-checklist me-2"></i>
                {!isCollapsed && "Pedidos"}
              </NavLink>
            </li>
          </ul>
        </nav>
        <button 
          className="btn btn-principal w-75 mt-4 py-3" 
          style={{ fontSize: 16, fontWeight: 600, marginBottom: isCollapsed ? 32 : 0 }}
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          {!isCollapsed && "Logout"}
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar; 