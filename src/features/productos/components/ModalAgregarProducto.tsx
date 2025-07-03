import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { Categoria, CreateProductoData } from "../types/types";
import { useCrearProducto, useSubirImagenProducto } from "../hooks/hooks";

interface ModalAgregarProductoProps {
  open: boolean;
  categorias: Categoria[];
  onClose: () => void;
}

const ModalAgregarProducto: React.FC<ModalAgregarProductoProps> = ({ open, categorias, onClose }) => {
  const { mutate: crearMutate, status: crearStatus } = useCrearProducto();
  const { mutate: subirImagenMutate, status: subirImagenStatus } = useSubirImagenProducto();
  const [formData, setFormData] = useState<CreateProductoData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoriaId: undefined
  });
  const [descripcion, setDescripcion] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        categoriaId: undefined
      });
      setDescripcion("");
      setSelectedFile(null);
      setMensaje(null);
    }
  }, [open]);

  if (!open) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    crearMutate({ ...formData, descripcion }, {
      onSuccess: (productoCreado) => {
        if (selectedFile) {
          subirImagenMutate({ id: productoCreado.id, file: selectedFile }, {
            onSuccess: () => {
              setMensaje("¡Producto creado y imagen subida!");
              setTimeout(() => { setMensaje(null); onClose(); }, 1500);
            },
            onError: () => setMensaje("Producto creado pero error al subir imagen")
          });
        } else {
          setMensaje("¡Producto creado!");
          setTimeout(() => { setMensaje(null); onClose(); }, 1500);
        }
      },
      onError: () => setMensaje("Error al crear producto")
    });
  };

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleGuardar}>
            <div className="modal-header">
              <h5 className="modal-title">Agregar producto</h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={crearStatus === "pending" || subirImagenStatus === "pending"}></button>
            </div>
            <div className="modal-body">
              {mensaje && <div className="alert alert-info">{mensaje}</div>}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    disabled={crearStatus === "pending"}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    name="categoriaId"
                    value={formData.categoriaId || ''}
                    onChange={handleInputChange}
                    disabled={crearStatus === "pending"}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    disabled={crearStatus === "pending"}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                    disabled={crearStatus === "pending"}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={descripcion}
                  onChange={(editor) => {
                    setDescripcion(editor.getData());
                  }}
                  disabled={crearStatus === "pending"}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Imagen del producto</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={crearStatus === "pending" || subirImagenStatus === "pending"}
                />
                <small className="form-text text-muted">
                  Formatos permitidos: JPG, PNG. Máximo 2MB.
                </small>
                {selectedFile && (
                  <div className="file-indicator">
                    <small className="text-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Archivo seleccionado: {selectedFile.name}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={crearStatus === "pending" || subirImagenStatus === "pending"}>Cancelar</button>
              <button type="submit" className="btn btn-principal" disabled={crearStatus === "pending" || subirImagenStatus === "pending"}>
                {(crearStatus === "pending" || subirImagenStatus === "pending") && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                )}
                Agregar producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarProducto; 