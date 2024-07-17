import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AutentificationService } from 'src/app/Services/Autentificacion/autentification.service';

@Component({
  selector: 'app-navigationfacturacion',
  templateUrl: './navigationfacturacion.component.html',
  styleUrls: ['./navigationfacturacion.component.css']
})
export class NavigationfacturacionComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private router: Router,
      private autSv: AutentificationService,
    ) { }

    logOut() {
      this.autSv.LogOut();
      return this.router.navigate(['/loggin']);
    }
}
