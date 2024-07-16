import { MensajesVM } from "./Mensajeria";

export interface FacturaVMRequest
{
    IdFactura : number
    NumeroFactura : string
    IdCliente : number
    Subtotal : number
    Igv : number
    Total : number

    Productos : ProductoFacturaVM []
}

export interface ProductoFacturaVM
{
    CodigoProducto : string
    NombreProducto : string
    Precio : number
    Cantidad : number 
    SubtotalF : number
}

export interface FacturaResponse {
    Factura: FacturaVMRequest
    Mensajeria: MensajesVM
}
export interface FacturaVMResponse {
    IdFactura: number

    NumeroFactura: string

    IdCliente: number
    Nombre: string
    Direccion: string
    Correo: string
    
    Subtotal: number
    PorcentajeIgv: number
    Igv: number
    Total: number

    FechaCreacion: Date

    Activo: boolean

    IdItem: number

    CodigoProducto: string
    NombreProducto: string

    Precio: number
    Cantidad: number
    SubtotalF: number

    

}

export interface ResultFactura extends MensajesVM {
    FacturaList: FacturaVMResponse[]
}


export interface Eliminacion {
    IdFactura: number
    NumeroFactura: string
}

export interface EliminacionFactura extends MensajesVM {
    eliminar: Eliminacion
}