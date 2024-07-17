import { MensajesVM } from "./Mensajeria";

export interface FacturaVMRequest {
    idFactura: number;
    numeroFactura: string;
    idCliente: number;
    subtotal: number;
    igv: number;
    total: number;
    productos: ProductoFacturaVM[];
}

export interface ProductoFacturaVM {
    codigoProducto: string;
    nombreProducto: string;
    precio: number;
    cantidad: number;
    subtotalF: number;
}

export interface FacturaResponse {
    factura: FacturaVMRequest;
    mensajeria: MensajesVM;
}

export interface ItemsRespnseVM {
    idItem: number;
    idFactura: number;
    codigoProducto: string;
    nombreProducto: string;
    precio: number;
    cantidad: number;
    subtotalF: number;
}

export interface FacturaVMResponse {
    idFactura: number;
    numeroFactura: string;
    idCliente: number;
    subtotal: number;
    porcentajeIgv: number;
    igv: number;
    total: number;
    activo: boolean;
    fechaCreacion: Date;
    items: ItemsRespnseVM[];
    cliente: ClienteResponseVM;
}

export interface ClienteResponseVM {
    idCliente: number;
    rucDni: string;
    nombre: string;
    direccion: string;
    correo: string;
}

export interface ResultFactura extends MensajesVM {
    facturaList: FacturaVMResponse[];
}

export interface Eliminacion {
    idFactura: number;
    numeroFactura: string;
}

export interface EliminacionFactura extends MensajesVM {
    eliminar: Eliminacion;
}