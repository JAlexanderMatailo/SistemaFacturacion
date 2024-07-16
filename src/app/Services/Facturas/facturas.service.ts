import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  urlBase = environment.urlBase
  facturasS = 'Factura/'
  constructor( private http : HttpClient ) { }
  CrearFacturaAsync(data:any){
    return this.http.post<any>(this.urlBase+this.facturasS+'CrearFacturaAsync', data);
  }

  getAllFacturas(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get<any>(this.urlBase+this.facturasS+'GetFacturas');
  }
  ObtenerNumeroFactura(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get<any>(this.urlBase+this.facturasS+'GenerarNumeroFactura');
  }

  deleteFactura(data: any){
    return this.http.post<any>(this.urlBase+this.facturasS+'DeleteFactura',data);
  }
}
