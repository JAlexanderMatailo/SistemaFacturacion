import { ProductoVMResponse } from "./Productos";

export interface ProductoConEstado extends ProductoVMResponse {
    disabled: boolean;
  }