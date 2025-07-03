import React from "react";
import { useUsuarios } from "../hooks/hooks";
import profileImg from "../../../assets/profile.webp";
import { useSearch } from '../../../shared/context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../../shared/utils/slugify';

const UsuarioManager: React.FC = () => {
  const { data: usuarios, isLoading, error } = useUsuarios();
  const { query } = useSearch();
  const navigate = useNavigate();
  const usuariosFiltrados = usuarios?.filter(usuario =>
    usuario.nombre.toLowerCase().includes(query.toLowerCase()) ||
    usuario.email.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <div className="text-center py-5">Cargando usuarios...</div>;
  if (error) return <div className="alert alert-danger">Error al cargar usuarios</div>;

  return (
    <>
      <h1 className="mb-4">Usuarios</h1>
      <section>
        <div className="row usuario-grid">
          {usuariosFiltrados?.map(usuario => (
            <div key={usuario.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <article className="usuario-card h-100 d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={profileImg}
                    alt="avatar"
                  className="usuario-card-img"
                  />
                <div className="usuario-card-nombre">{usuario.nombre}</div>
                <div className="usuario-card-email">{usuario.email}</div>
                  <button
                  className="usuario-card-btn mt-auto"
                  onClick={() => navigate(`/admin/pedido-usuario/${slugify(usuario.email.split('@')[0])}`)}
                  >
                    <i className="bi bi-bag me-2"></i>
                  Ver sus pedidos
                  </button>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UsuarioManager; 