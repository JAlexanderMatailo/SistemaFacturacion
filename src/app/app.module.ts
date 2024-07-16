import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogosComponent } from './Components/Catalogos/catalogos/catalogos.component';
import { ProductoComponent } from './Components/Catalogos/producto/producto.component';
import { ClientesComponent } from './Components/Catalogos/clientes/clientes.component';
import { FacturasComponent } from './Components/Documentos/facturas/facturas.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationfacturacionComponent } from './Components/navigationfacturacion/navigationfacturacion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { DocumentosComponent } from './Components/Documentos/documentos/documentos.component';
import { MatTabsModule } from '@angular/material/tabs';
import{MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SetproductosComponent } from './Components/CatalogosRegistros/setproductos/setproductos.component';
import { SetclientesComponent } from './Components/CatalogosRegistros/setclientes/setclientes.component';
import {MatDialogModule}from '@angular/material/dialog';
import { OnlyNumbersWithDecimalDirective } from './Shared/DirectiveNumber/only-numbers-with-decimal.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrarfacturaComponent } from './Components/RegistroFactura/registrarfactura/registrarfactura.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    CatalogosComponent,
    ProductoComponent,
    ClientesComponent,
    FacturasComponent,
    LoginComponent,
    NavigationfacturacionComponent,
    DocumentosComponent,
    SetproductosComponent,
    SetclientesComponent,
    OnlyNumbersWithDecimalDirective,
    RegistrarfacturaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatAutocompleteModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
