import { ProductoVMResponse } from "./Productos";

export interface ProductoConEstado extends ProductoVMResponse {
    disabled: boolean;
  }

export  interface Producto {
    nombre: string;
    codigo: string;
    precio: number;
}

export interface Element {
    cantidad: number;
    selectedProducto: Producto;
    disabled?: boolean;
}

export  interface ElementoTabla {
    cantidad: number;
    selectedProducto: ProductoConEstado;
    // Define las demás propiedades necesarias para tu aplicación
  }