import { MensajesVM } from "./Mensajeria"

export interface ClientesVM {
    idCliente : number
    RucDni: string
    Nombre: string
    Direccion: string
    Correo: string
}
export interface ClienteResponse {
    IdCliente: number
    RucDni: string
    Nombre: string
    Direccion: string
    Correo: string
    Activo: string
    FechaCreacion: Date
}

export interface ResultClientes extends MensajesVM {
    listClientes: ClienteResponse[]
}
