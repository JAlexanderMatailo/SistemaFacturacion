import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  UpdateProduct(data: any){
    return this.http.post<any>(this.urlBase+this.productos+'UpdateProduct',data);
  }
  deleteProducto(id:number):Observable<any>{
    const product ={
      id
    }
    let params = new HttpParams()
    .append("IdProducto", product.id)
    let headers = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.post<any>(this.urlBase+this.productos+'DeleteProducto',product, { headers, params});
  }
}
