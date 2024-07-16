import { MensajesVM } from "./Mensajeria"

export interface ClientesVM {
    idCliente : number
    rucDni: string
    nombre: string
    direccion: string
    correo: string
}
export interface ClienteResponse {
    idCliente: number
    rucDni: string
    nombre: string
    direccion: string
    correo: string
    activo: string
    fechaCreacion: Date
}

export interface ResultClientes extends MensajesVM {
    listClientes: ClienteResponse[]
}
