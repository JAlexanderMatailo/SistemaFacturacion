import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { ClientesVM } from 'src/app/Interface/Clientes';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import { ClienteService } from 'src/app/Services/Clientes/cliente.service';
import { MyErrorStateMatcher } from 'src/app/Shared/ErrorStament';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-setclientes',
  templateUrl: './setclientes.component.html',
  styleUrls: ['./setclientes.component.css']
})
export class SetclientesComponent {
  tittle: string = "INGRESAR DATOS DE REGISTRO";

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  clienteReq: ClientesVM = {
    idCliente: 0,
    rucDni: "",
    nombre: "",
    direccion: "",
    correo: "",
  }

  mensajeria: MensajesVM = {
    codigoResult: 0,
    mensajeDescripcion: ""
  }
  productForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;

  isDisabled: boolean = true;

  constructor(private matDialog: MatDialog,
    private clientes: ClienteService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ClientesVM
  ) {
    this.productForm = this.fb.group({
      productosS: ['', Validators.required],
      dsProducto: ['', Validators.required],
      preProducto: ['', Validators.required],
      fRegistro: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.obtenerDatos();
  }
  Cancelar() {
    this.matDialog.closeAll();
  }
  obtenerDatos() {
    console.log("Llegó data: ", this.data);
    if (this.data != null) {
      // this.clienteReq = { ...this.data }; 
      this.clienteReq.idCliente = this.data.idCliente
      this.clienteReq.rucDni = this.data.rucDni
      this.clienteReq.nombre = this.data.nombre
      this.clienteReq.direccion = this.data.direccion
      this.clienteReq.correo = this.data.correo
      console.log("Data", this.clienteReq);
      
    }
  }
  SetProducto() {

    if (this.validarCampos()) {
      if(this.clienteReq.idCliente === 0){
        this.clientes.setClientes(this.clienteReq).subscribe(resp => {
          if (resp) {
            Swal.fire({
              title: "Excelente!",
              text: `${resp.mensajeDescripcion}: ${this.clienteReq?.nombre +' ' + 'con el código:'+ ' ' + this.clienteReq?.rucDni}`,
              icon: "success",
              confirmButtonColor: "rgb(10, 83, 58)",
              confirmButtonText: "Aceptar",
              showCloseButton: true
            });
            this.matDialog.closeAll();
          } else {
            this.mensajeria = resp
            Swal.fire("Ups!", "No se pudo registrar el producto, debido a: " + this.mensajeria.mensajeDescripcion, "error");
          }
        })
      }else{
        this.clientes.UpdateCliente(this.clienteReq).subscribe(resp => {
          if (resp) {
            Swal.fire({
              title: "Excelente!",
              text: `${resp.mensajeDescripcion}: ${this.clienteReq?.nombre +' ' + 'con el código:'+ ' ' + this.clienteReq?.rucDni}`,
              icon: "success",
              confirmButtonColor: "rgb(10, 83, 58)",
              confirmButtonText: "Aceptar",
              showCloseButton: true
            });
            this.matDialog.closeAll();
          } else {
            this.mensajeria = resp
            Swal.fire("Ups!", "No se pudo registrar el producto, debido a: " + this.mensajeria.mensajeDescripcion, "error");
          }
        })
      }
      
    }
  }
  validarCampos() {
    if (!this.clienteReq.rucDni || this.clienteReq.rucDni.trim() === '') {
      Swal.fire("Ups!", "Agregue el código del producto", "error");
      return false;
    } else if (!this.clienteReq.nombre || this.clienteReq.nombre.trim() === '') {
      Swal.fire("Ups!", "Ingrese el detalle del producto", "error");
      return false;
    } else if (!this.clienteReq.direccion || this.clienteReq.direccion.trim() === '') {
      Swal.fire("Ups!", "Ingrese el precio del producto", "error");
      return false;
    } else if (!this.clienteReq.correo || this.clienteReq.correo.trim() === '') {
      Swal.fire("Ups!", "Verifique que la fecha sea la correcta", "error");
      return false;
    } else {
      return true;
    }
  }
  filtrarNumeros(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  onCedulaInputChange(event: Event) {
    this.filtrarNumeros(event);
  }
}
