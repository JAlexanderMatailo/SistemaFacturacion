import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { NavigationfacturacionComponent } from './Components/navigationfacturacion/navigationfacturacion.component';
import { CatalogosComponent } from './Components/Catalogos/catalogos/catalogos.component';
import { DocumentosComponent } from './Components/Documentos/documentos/documentos.component';

const routes: Routes = [
  { path: 'loggin', component: LoginComponent },
  {
    path: 'home',
    component: NavigationfacturacionComponent,
    children: [
      { path: 'catalogos', component: CatalogosComponent },
      { path: 'documentos', component: DocumentosComponent },
    ]
  },

  { path: '', redirectTo: '/loggin', pathMatch: 'full' }
  // { path: '', redirectTo: '/navigation', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
