import React, { useState } from "react";
import { useProductos, useCrearProducto, useEliminarProducto, useSubirImagenProducto } from "../hooks/hooks";
import { useCategorias } from "../../categorias/hooks/hooks";
import ModalConfirmar from "../../categorias/components/ModalConfirmar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { CreateProductoData } from "../types/types";
import ModalEditarProducto from "./ModalEditarProducto";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalVerDescripcionProducto from "./ModalVerDescripcionProducto";
import { useSearch } from '../../../shared/context/SearchContext';

const ProductoManager: React.FC = () => {
  const { data: productos, isLoading, error } = useProductos();
  const { data: categorias } = useCategorias();
  const { mutate: crearMutate, status: crearStatus } = useCrearProducto();
  const { mutate: eliminarMutate, status: eliminarStatus } = useEliminarProducto();
  const { mutate: subirImagenMutate, status: subirImagenStatus } = useSubirImagenProducto();
  const { query } = useSearch();
  
  const [formData, setFormData] = useState<CreateProductoData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoriaId: undefined
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [modalBorrar, setModalBorrar] = useState<{ open: boolean; id: number | null; nombre: string }>({ 
    open: false, 
    id: null, 
    nombre: "" 
  });
  const [modalEditar, setModalEditar] = useState<{ open: boolean; producto: any | null }>({ 
    open: false, 
    producto: null 
  });
  const [modalVerDescripcion, setModalVerDescripcion] = useState<{ open: boolean; descripcion: string; nombre: string }>({ open: false, descripcion: '', nombre: '' });

  const productosFiltrados = productos?.filter(producto =>
    producto.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      categoriaId: undefined
    });
    setSelectedFile(null);
  };

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || formData.precio <= 0) return;
    
    crearMutate(formData, {
      onSuccess: (productoCreado) => {
        if (selectedFile) {
          subirImagenMutate({ id: productoCreado.id, file: selectedFile }, {
            onSuccess: () => {
              setMensaje("¡Producto creado con imagen!");
              resetForm();
              setTimeout(() => setMensaje(null), 2000);
            },
            onError: () => {
              setMensaje("Producto creado pero error al subir imagen");
              resetForm();
              setTimeout(() => setMensaje(null), 2000);
            }
          });
        } else {
          setMensaje("¡Producto agregado!");
          resetForm();
          setTimeout(() => setMensaje(null), 2000);
        }
      },
      onError: () => setMensaje("Error al agregar producto"),
    });
  };

  const handleConfirmBorrar = () => {
    if (modalBorrar.id) {
      eliminarMutate(modalBorrar.id, {
        onSuccess: () => {
          setModalBorrar({ open: false, id: null, nombre: "" });
          setMensaje("¡Producto eliminado!");
          setTimeout(() => setMensaje(null), 2000);
        },
        onError: () => {
          setModalBorrar({ open: false, id: null, nombre: "" });
          setMensaje("Error al eliminar producto");
          setTimeout(() => setMensaje(null), 2000);
        },
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB'
    }).format(price);
  };

  return (
    <div>
      <div className="productos-header">
        <h1 className="mb-0">Productos</h1>
        <button 
          className="btn btn-principal btn-toggle-form productos-header-btn"
          onClick={() => setModalAgregar(true)}
        >
          <i className={`bi ${showForm ? 'bi-dash-lg' : 'bi-plus-lg'} me-2`}></i>
          Agregar Producto
        </button>
      </div>
      
      <ModalAgregarProducto
        open={modalAgregar}
        categorias={categorias || []}
        onClose={() => setModalAgregar(false)}
      />

      {mensaje && (
        <div className={`alert ${mensaje.includes('Error') ? 'alert-danger' : 'alert-success'} mb-3`}>
          {mensaje}
        </div>
      )}

      {/* Lista de productos */}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">Error al cargar productos</div>
      ) : (
        <div className="row producto-grid">
          {productosFiltrados?.map(producto => (
            <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="producto-card h-100 d-flex flex-column">
                <div className="producto-card-img-wrapper">
                    <img
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${producto.imagenUrl}`}
                      alt={producto.nombre}
                    className="producto-card-img"
                    />
                  </div>
                <div className="producto-card-body flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <div className="producto-card-nombre">{producto.nombre}</div>
                    <div className="producto-card-categoria">
                    {producto.categoria ? (
                        <span className="badge producto-card-categoria-badge">
                        {producto.categoria.nombre}
                      </span>
                    ) : (
                        <span className="text-muted">Sin categoría</span>
                    )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="producto-card-precio">
                      {formatPrice(producto.precio)}
                    </span>
                    <span className={`producto-card-stock badge ${producto.stock === 0 ? 'producto-card-stock-zero' : ''}`}>
                      Stock: {producto.stock}
                    </span>
                  </div>
                </div>
                <div className="producto-card-footer mt-2">
                  <div className="producto-card-actions d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-action btn-eliminar"
                      title="Eliminar"
                      onClick={() => setModalBorrar({ open: true, id: producto.id, nombre: producto.nombre })}
                      disabled={eliminarStatus === "pending"}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn btn-action btn-editar"
                      title="Editar"
                      onClick={() => setModalEditar({ open: true, producto })}
                      disabled={eliminarStatus === "pending"}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-action btn-ver"
                      title="Ver descripción"
                      onClick={() => setModalVerDescripcion({ open: true, descripcion: producto.descripcion, nombre: producto.nombre })}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalConfirmar
        open={modalBorrar.open}
        onClose={() => setModalBorrar({ open: false, id: null, nombre: "" })}
        onConfirm={handleConfirmBorrar}
        mensaje={`¿Seguro que deseas eliminar el producto "${modalBorrar.nombre}"?`}
        titulo="Confirmar eliminación"
        confirmText={eliminarStatus === "pending" ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        loading={eliminarStatus === "pending"}
      />

      <ModalEditarProducto
        open={modalEditar.open}
        producto={modalEditar.producto}
        categorias={categorias || []}
        onClose={() => setModalEditar({ open: false, producto: null })}
      />

      <ModalVerDescripcionProducto
        open={modalVerDescripcion.open}
        descripcion={modalVerDescripcion.descripcion}
        nombre={modalVerDescripcion.nombre}
        onClose={() => setModalVerDescripcion({ open: false, descripcion: '', nombre: '' })}
      />
    </div>
  );
};

export default ProductoManager; 