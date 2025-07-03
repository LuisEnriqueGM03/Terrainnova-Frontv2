import React from "react";

interface ModalConfirmarProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mensaje: string;
  titulo?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ModalConfirmar: React.FC<ModalConfirmarProps> = ({ open, onClose, onConfirm, mensaje, titulo = "Confirmar", confirmText = "Confirmar", cancelText = "Cancelar", loading = false }) => {
  if (!open) return null;
  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <div className="modal-body">
            {mensaje}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>{cancelText}</button>
            <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmar; 