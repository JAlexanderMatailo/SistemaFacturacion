import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  producto: ProductoVMRequest = {
    Codigo: "",
    Nombre: "",
    Precio: 0.0,
    FechaCreacion: new Date()
  }

  mensajeria : MensajesVM = {
    codigoResult : 0,
    mensajeDescripcion: ""
  }
  productForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;

  constructor(private matDialog: MatDialog,
    private productos: ProductosService,
    private fb: FormBuilder,
  ) {
this.productForm = this.fb.group({
  productosS: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Cancelar() {
    this.matDialog.closeAll();
  }
  SetProducto() {

    if (this.validarCampos()) {
      this.productos.SetProducto(this.producto).subscribe(resp => {
        if(resp){
          Swal.fire({
            title: "Excelente!",
            text: `Se añadido el producto: ${this.producto?.Nombre + 'con el código: ' + this.producto?.Codigo}`,
            icon: "success",
            confirmButtonColor: "rgb(10, 83, 58)",
            confirmButtonText: "Aceptar",
            showCloseButton: true
          });
          this.matDialog.closeAll();
        }else {
          this.mensajeria = resp
          Swal.fire("Ups!", "No se pudo registrar el producto, debido a: "+ this.mensajeria.mensajeDescripcion, "error");
        }
      })
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
}
