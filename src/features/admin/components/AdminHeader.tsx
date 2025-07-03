import React from "react";
import { useAuth } from '../../auth/context';
import { useSearch } from '../../../shared/context/SearchContext';
import avatarImg from "../../../assets/profile.webp";
import { useLocation } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const { usuario } = useAuth();
  const { query, setQuery } = useSearch();
  const location = useLocation();
  const isDashboard = location.pathname === "/admin/dashboard";

  return (
    <header className="admin-header">
      {!isDashboard && (
        <div className="admin-header-search-wrapper">
          <div className="admin-header-search-box">
            <input
              className="form-control admin-header-search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-link admin-header-search-btn" type="button">
          <i className="bi bi-search"></i>
        </button>
        </div>
      )}
      <div className="admin-header-user">
        <span className="admin-header-nombre">{usuario?.nombre || 'Admin'}</span>
        <img src={avatarImg} alt="Avatar de usuario administrador" className="admin-header-avatar" />
      </div>
    </header>
  );
};

export default AdminHeader; 