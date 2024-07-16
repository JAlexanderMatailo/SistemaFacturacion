import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase = environment.urlBase
  clientesS = 'Cliente/'
  constructor( private http : HttpClient ) { }

  setClientes(data:any){
    return this.http.post<any>(this.urlBase+this.clientesS+'SetCliente', data);
  }

  getAllClientes(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get<any>(this.urlBase+this.clientesS+'GetClientes');
  }
  UpdateCliente(data: any){
    return this.http.post<any>(this.urlBase+this.clientesS+'UpdateCliente',data);
  }
  deleteCliente(id:number):Observable<any>{
    const cliente ={
      id
    }
    let params = new HttpParams()
    .append("idCliente", cliente.id)
    let headers = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.post<any>(this.urlBase+this.clientesS+'DeleteCliente',cliente, { headers, params});
  }
}
