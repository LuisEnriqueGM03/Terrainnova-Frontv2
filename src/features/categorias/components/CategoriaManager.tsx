import React, { useState } from "react";
import { useCategorias, useCrearCategoria, useEditarCategoria, useEliminarCategoria } from "../hooks/hooks";
import ModalConfirmar from "./ModalConfirmar";
import ModalEditarCategoria from "./ModalEditarCategoria";
import { useSearch } from '../../../shared/context/SearchContext';

const CategoriaManager: React.FC = () => {
  const { data: categorias, isLoading, error } = useCategorias();
  const { mutate: crearMutate, status: crearStatus } = useCrearCategoria();
  const { mutate: editarMutate, status: editarStatus } = useEditarCategoria();
  const { mutate: eliminarMutate, status: eliminarStatus } = useEliminarCategoria();
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [modalBorrar, setModalBorrar] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [modalEditar, setModalEditar] = useState<{ open: boolean; id: number | null; nombre: string }>({ open: false, id: null, nombre: "" });
  const { query } = useSearch();
  const categoriasFiltradas = categorias?.filter(cat =>
    cat.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    crearMutate(nombre, {
      onSuccess: () => {
        setMensaje("¡Categoría agregada!");
        setNombre("");
        setTimeout(() => setMensaje(null), 2000);
      },
      onError: () => setMensaje("Error al agregar categoría"),
    });
  };

  const handleConfirmBorrar = () => {
    if (modalBorrar.id) {
      eliminarMutate(modalBorrar.id, {
        onSuccess: () => {
          setModalBorrar({ open: false, id: null });
          setMensaje("¡Categoría eliminada!");
          setTimeout(() => setMensaje(null), 2000);
        },
        onError: () => {
          setModalBorrar({ open: false, id: null });
          setMensaje("Error al eliminar categoría");
          setTimeout(() => setMensaje(null), 2000);
        },
      });
    }
  };

  const handleConfirmEditar = () => {
    if (modalEditar.id && modalEditar.nombre.trim()) {
      editarMutate({ id: modalEditar.id, nombre: modalEditar.nombre }, {
        onSuccess: () => {
          setModalEditar({ open: false, id: null, nombre: "" });
          setMensaje("¡Categoría editada!");
          setTimeout(() => setMensaje(null), 2000);
        },
        onError: () => {
          setModalEditar({ open: false, id: null, nombre: "" });
          setMensaje("Error al editar categoría");
          setTimeout(() => setMensaje(null), 2000);
        },
      });
    }
  };

  return (
    <div>
      <h1 className="mb-4">Categorías</h1>
      <form className="categorias-header-form mb-4" onSubmit={handleAgregar} autoComplete="off">
        <input
          className="form-control categoria-input"
          type="text"
          placeholder="Nueva categoría"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <button className="btn categoria-btn" type="submit" disabled={crearStatus === "pending"}>
          {crearStatus === "pending" ? "Agregando..." : "Agregar"}
        </button>
      </form>
      {mensaje && <div className="mb-3 text-success categoria-mensaje">{mensaje}</div>}
      {isLoading ? (
        <div>Cargando categorías...</div>
      ) : error ? (
        <div className="text-danger">Error al cargar categorías</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {categoriasFiltradas?.map(cat => (
            <div key={cat.id} className="categoria-item">
              <div className="d-flex align-items-center gap-3">
                <span className="categoria-badge">
                  <i className="bi bi-tags"></i>
                </span>
                <span className="categoria-nombre">{cat.nombre}</span>
              </div>
              <div className="categoria-item-actions d-flex align-items-center gap-2">
                <button
                  className="btn categoria-btn-editar"
                  title="Editar"
                  onClick={() => setModalEditar({ open: true, id: cat.id, nombre: cat.nombre })}
                  disabled={editarStatus === "pending" || eliminarStatus === "pending"}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn categoria-btn-eliminar"
                  title="Eliminar"
                  onClick={() => setModalBorrar({ open: true, id: cat.id })}
                  disabled={editarStatus === "pending" || eliminarStatus === "pending"}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalConfirmar
        open={modalBorrar.open}
        onClose={() => setModalBorrar({ open: false, id: null })}
        onConfirm={handleConfirmBorrar}
        mensaje="¿Seguro que deseas eliminar esta categoría?"
        titulo="Confirmar eliminación"
        confirmText={eliminarStatus === "pending" ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        loading={eliminarStatus === "pending"}
      />
      <ModalEditarCategoria
        open={modalEditar.open}
        nombre={modalEditar.nombre}
        onClose={() => setModalEditar({ open: false, id: null, nombre: "" })}
        onChange={nombre => setModalEditar({ ...modalEditar, nombre })}
        onConfirm={handleConfirmEditar}
        loading={editarStatus === "pending"}
      />
    </div>
  );
};

export default CategoriaManager; 