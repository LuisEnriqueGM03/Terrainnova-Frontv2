export interface Producto {
  id: number;
  nombre: string;
  descripcion: any;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoria?: Categoria;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface CreateProductoData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId?: number;
}

export interface UpdateProductoData {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  categoriaId?: number;
} 