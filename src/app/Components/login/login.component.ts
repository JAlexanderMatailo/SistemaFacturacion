import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultUsersLogin, UsuarioR, UsuariosVMResponse } from 'src/app/Interface/Users';
import { AutentificationService } from 'src/app/Services/Autentificacion/autentification.service';
import { MyErrorStateMatcher } from 'src/app/Shared/ErrorStament';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // userControl = new FormControl('', [Validators.required]);
  // passControl = new FormControl('', [Validators.required]);

  // matcher = new MyErrorStateMatcher();
  // hide = true;
  usuario: UsuarioR = {
    nombre: "",
    password: ""
  }

  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private autSv: AutentificationService,
  ) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public validarFormulario() {
    this.autSv.loginSession(this.usuario).subscribe(
      (response: ResultUsersLogin) => {
        if (response.codigoResult == 200) {
          var token = this.autSv.checkToken();
          if (token) {

            if (response && response.usuario.token) {
              this.router.navigate(['/home']);
            }
          } else {
            Swal.fire("Ups!", "Ubo un error: " + response.mensajeDescripcion, "error");
          }

        } else {
          this.router.navigate(['/loggin']);
        }
        // Maneja la respuesta exitosa aquí (e.g., almacenar el token, redirigir al usuario, etc.)
      },
      (error) => {
        this.router.navigate(['/loggin']);
        // Maneja el error aquí (e.g., mostrar un mensaje de error)
      }
    )
  }

}
