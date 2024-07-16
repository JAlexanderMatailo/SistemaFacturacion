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
    idProducto : number
    codigo: string;
    nombre: string;
    precio: number; 
    fechaCreacion: Date;
}

export interface ResultProductos extends MensajesVM {
    listProductos: ProductoVMResponse[]; 
}