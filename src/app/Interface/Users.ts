import { MensajesVM } from './Mensajeria';
export interface UsuarioR {
    nombre: string,
    password: string
}

export interface UsuariosVMResponse {
    token: string;
    idUsuario: number;
    nombreUsuario: string,
    correo: string,
}
export interface ResultUsersLogin extends MensajesVM
{
    usuario: UsuariosVMResponse
}