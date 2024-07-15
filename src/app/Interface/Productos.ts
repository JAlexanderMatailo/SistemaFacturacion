import { MensajesVM } from "./Mensajeria";

export interface ProductoVMResponse {
    IdProducto: number;
    Codigo: string;
    Nombre: string;
    Precio: number;
    Stock: number;
    Activo?: boolean;
    FechaCreacion?: Date;
}

export interface ProductoVMRequest {
    Codigo: string;
    Nombre: string;
    Precio: number; 
    FechaCreacion: Date;
}

export interface ResultProductos extends MensajesVM {
    listProductos: ProductoVMResponse[]; 
}