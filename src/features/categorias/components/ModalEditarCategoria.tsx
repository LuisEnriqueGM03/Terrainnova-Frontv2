import React from "react";

interface ModalEditarCategoriaProps {
  open: boolean;
  nombre: string;
  onClose: () => void;
  onChange: (nombre: string) => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ModalEditarCategoria: React.FC<ModalEditarCategoriaProps> = ({ 
  open, 
  nombre, 
  onClose, 
  onChange, 
  onConfirm,
  loading = false 
}) => {
  if (!open) return null;
  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" style={{ fontSize: '1.3rem', margin: 0 }}>Editar categoría</h2>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <div className="modal-body">
            <label htmlFor="editar-categoria-nombre" className="form-label">Nombre de la categoría</label>
            <input
              id="editar-categoria-nombre"
              className="form-control"
              type="text"
              value={nombre}
              onChange={e => onChange(e.target.value)}
              disabled={loading}
              placeholder="Nombre de la categoría"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancelar</button>
            <button className="btn btn-principal" onClick={onConfirm} disabled={loading || !nombre.trim()}>
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarCategoria; 