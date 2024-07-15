import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { NavigationfacturacionComponent } from './Components/navigationfacturacion/navigationfacturacion.component';

const routes: Routes = [
  { path: 'loggin', component: LoginComponent },
  { path: 'home', 
  component: NavigationfacturacionComponent,
children:[
  
] },

  { path: '', redirectTo: '/loggin', pathMatch: 'full' }
  // { path: '', redirectTo: '/navigation', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
