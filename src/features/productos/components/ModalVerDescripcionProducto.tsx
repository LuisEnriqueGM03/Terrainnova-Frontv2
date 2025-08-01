import React from "react";

interface ModalVerDescripcionProductoProps {
  open: boolean;
  onClose: () => void;
  descripcion: string;
  nombre: string;
}

const ModalVerDescripcionProducto: React.FC<ModalVerDescripcionProductoProps> = ({ open, onClose, descripcion, nombre }) => {
  if (!open) return null;
  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <section aria-labelledby="modal-ver-descripcion-title">
            <div className="modal-header">
              <h2 className="modal-title" id="modal-ver-descripcion-title">Descripción del producto: {nombre}</h2>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="editorjs-viewer" dangerouslySetInnerHTML={{ __html: descripcion || '<em>Sin descripción</em>' }} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalVerDescripcionProducto; 