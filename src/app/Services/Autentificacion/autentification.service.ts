import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment.development';
import { ResultUsersLogin, UsuarioR, UsuariosVMResponse } from 'src/app/Interface/Users';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AutentificationService {
urlBase = environment.urlBase

constructor(private http : HttpClient) { }
  controlerAuth = 'Autenticacion/'
  usuRH: UsuariosVMResponse = {
    token: '',
    idUsuario: 0,
    nombreUsuario:'',
    correo:''
  }

  user: ResultUsersLogin = {
    codigoResult : 0,
    mensajeDescripcion: "",
    usuario: this.usuRH
  };


  loginSession(usurio : UsuarioR):  Observable<ResultUsersLogin> {
    var response = this.http.post<ResultUsersLogin>(this.urlBase + this.controlerAuth + 'Loggin' , usurio);
    if(response){
      
      response.subscribe(
        (response: ResultUsersLogin) => {
          this.user = response
          if(this.user.codigoResult == 200){
            this.usuRH = this.user.usuario
          
            this.setToken();
          }else{
            Swal.fire("Ups!", "Hubo un error: " + this.user.mensajeDescripcion, "error");
          }
          
        }
      )
      
    }
    return  response;
    // return this.http.post<any>(this.urlBase+this.controlerAuth+'Loggin', usurio);
  }
  LogOut(): void {
    this.clearToken();
  }
  setToken(): void {
    sessionStorage.setItem('token', this.usuRH.token)
    sessionStorage.setItem('usuario', this.usuRH.nombreUsuario)
  }
  clearToken(): void {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
  }
  checkToken(): boolean {
    const token: any = sessionStorage.getItem('token'); 
    if (token) {
      return true;
    }
    return false;
  }
}
