import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoVMRequest, ProductoVMResponse } from 'src/app/Interface/Productos';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/Services/Prodcutos/productos.service';
import { SetproductosComponent } from '../../CatalogosRegistros/setproductos/setproductos.component';
import { MatDialog } from '@angular/material/dialog';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  displayedColumns: string[] = ['idProducto', 'codigo', 'nombre', 'precio', 'stock', 'activo', 'fechaCreacion', 'Acciones'];
  dataSource: MatTableDataSource<ProductoVMResponse>;

  productoL: any [] = []

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private productos : ProductosService,
    private matDialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProductos(){
    this.productos.getAllProductos().subscribe(resp => {
      this.productoL = resp.listProductos;
      this.dataSource.data = this.productoL;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
  setProductos(){
    const dialogRef = this.matDialog.open(SetproductosComponent, {
      width: '450px',
      height: '450px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getProductos()
    });
  }

  setProduct(event:any){
    if(event){
      this.producto.Codigo = event.codigo
      this.producto.Nombre = event.nombre
      this.producto.Precio = event.precio
      this.producto.FechaCreacion = event.fechaCreacion
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
          this.getProductos()
          
          this.matDialog.closeAll();
        } else {
          this.mensajeria = resp
          Swal.fire("Ups!", "No se pudo registrar el producto, debido a: " + this.mensajeria.mensajeDescripcion, "error");
        }
      })
    }
  }

  UpdateProducto(producto: ProductoVMRequest) {
    //localStorage.setItem("usuario", JSON.stringify(person));
    console.log("Data: ",producto);
    
    const dialogRef = this.matDialog.open(SetproductosComponent, {
      width: '550px',
      height: 'auto',
      panelClass: 'fondo',
      data: producto
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProductos()
    });
  }
  DeleteProducto(event: any) {
    //alert(person.idContribuyente)
    this.productos.deleteProducto(event.idProducto).subscribe(resp => {
      if (resp) {
        Swal.fire({
          title: "Excelente!",
          text: `${resp.mensajeDescripcion}: ${this.producto?.Nombre +' ' + 'con el código:'+ ' ' + this.producto?.Codigo}`,
          icon: "success",
          confirmButtonColor: "rgb(10, 83, 58)",
          confirmButtonText: "Aceptar",
          showCloseButton: true
        });
        this.getProductos()
      } else {
        this.mensajeria = resp
          Swal.fire("Ups!", "Ubo un error al intentar eliminar: " + this.mensajeria.mensajeDescripcion, "error");
      }
    });
  }
}
