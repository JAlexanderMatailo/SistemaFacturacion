export interface UsuarioR {
    nombre: string,
    password: string
  }

  export interface UsuarioResponse {
    token: string;
    UsuarioId: number;
    nameUser: string
}