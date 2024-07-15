import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import { ProductoVMRequest } from 'src/app/Interface/Productos';
import { ProductosService } from 'src/app/Services/Prodcutos/productos.service';
import { MyErrorStateMatcher } from 'src/app/Shared/ErrorStament';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-setproductos',
  templateUrl: './setproductos.component.html',
  styleUrls: ['./setproductos.component.css']
})
export class SetproductosComponent {
  tittle: string = "INGRESAR DATOS DE REGISTRO";

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  producto: ProductoVMRequest = {
    idProducto: 0,
    Codigo: "",
    Nombre: "",
    Precio: 0.0,
    FechaCreacion: new Date()
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
    private productos: ProductosService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductoVMRequest
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
      this.producto = { ...this.data }; // Copia los datos recibidos a producto
    }
  }
  SetProducto() {

    if (this.validarCampos()) {
      if(this.producto.idProducto === 0){
        this.productos.SetProducto(this.producto).subscribe(resp => {
          if (resp) {
            Swal.fire({
              title: "Excelente!",
              text: `${resp.mensajeDescripcion}: ${this.producto?.Nombre +' ' + 'con el código:'+ ' ' + this.producto?.Codigo}`,
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
        this.productos.UpdateProduct(this.producto).subscribe(resp => {
          if (resp) {
            Swal.fire({
              title: "Excelente!",
              text: `${resp.mensajeDescripcion}: ${this.producto?.Nombre +' ' + 'con el código:'+ ' ' + this.producto?.Codigo}`,
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
    if (!this.producto.Codigo || this.producto.Codigo.trim() === '') {
      Swal.fire("Ups!", "Agregue el código del producto", "error");
      return false;
    } else if (!this.producto.Nombre || this.producto.Nombre.trim() === '') {
      Swal.fire("Ups!", "Ingrese el detalle del producto", "error");
      return false;
    } else if (!this.producto.Precio || this.producto.Precio === 0) {
      Swal.fire("Ups!", "Ingrese el precio del producto", "error");
      return false;
    } else if (!this.producto.FechaCreacion) {
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
