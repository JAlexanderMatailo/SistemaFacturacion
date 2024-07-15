import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlBase = environment.urlBase
  productos = 'Producto/'
  constructor( private http : HttpClient ) { }

  SetProducto(data:any){
    return this.http.post<any>(this.urlBase+this.productos+'SetProductos', data);
  }

  getAllProductos(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get<any>(this.urlBase+this.productos+'GetProductosHistory');
  }
}
