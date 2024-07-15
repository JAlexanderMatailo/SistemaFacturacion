import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment.development';
import { UsuarioR, UsuarioResponse } from 'src/app/Interface/Users';

@Injectable({
  providedIn: 'root'
})
export class AutentificationService {
urlBase = environment.urlBase

constructor(private http : HttpClient) { }
  controlerAuth = 'Autenticacion/'
  usuRH: UsuarioResponse = {
    token: '',
    UsuarioId: 0,
    nameUser:''
  }



  loginSession(usurio : UsuarioR):  Observable<UsuarioResponse> {
    var response = this.http.post<UsuarioResponse>(this.urlBase + this.controlerAuth + 'Loggin' , usurio);
    if(response){
      console.log("Usuario: ", response.subscribe());
      response.subscribe(
        (response: UsuarioResponse) => {
          this.usuRH = response 
          this.setToken();
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
    /*localStorage.setItem('token', this.usuRH.token)
    localStorage.setItem('rol', this.usuRH.Rol)
    localStorage.setItem('usuario', this.usuRH.Usuario)*/
    sessionStorage.setItem('token', this.usuRH.token)
    sessionStorage.setItem('usuario', this.usuRH.nameUser)
  }
  clearToken(): void {
    /*localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');*/
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
