import { MensajesVM } from "./Mensajeria";

export interface ProductoVMResponse {
    idProducto: number;
    codigo: string;
    nombre: string;
    precio: number;
    stock: number;
    activo?: boolean;
    fechaCreacion?: Date;
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
