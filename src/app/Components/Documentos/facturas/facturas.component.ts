import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Eliminacion, FacturaVMRequest, FacturaVMResponse } from 'src/app/Interface/Facturas';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import { FacturasService } from 'src/app/Services/Facturas/facturas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {

  displayedColumns: string[] = ['idFactura', 'numeroFactura', 'nombreCliente', 'codigoProducto', 'nombreProducto','Total', 'Acciones'];
  dataSource: MatTableDataSource<FacturaVMResponse>;

  productoL: any [] = []

  factura: FacturaVMResponse = {
    IdFactura: 0,
    NumeroFactura: "",

    IdCliente: 0,
    Subtotal: 0,
    PorcentajeIgv: 0,
    Igv: 0,
    Total: 0,

    FechaCreacion: new Date,

    Activo: true,

    IdItem: 0,

    CodigoProducto: "",
    NombreProducto: "",

    Precio: 0,
    Cantidad: 0,
    SubtotalF: 0,

    Nombre: "",
    Direccion: "",
    Correo: ""
  }

  mensajeria: MensajesVM = {
    codigoResult: 0,
    mensajeDescripcion: ""
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private facturas : FacturasService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getFacturas();
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

  getFacturas(){
    this.facturas.getAllFacturas().subscribe(resp => {
      this.productoL = resp.facturaList;
      this.dataSource.data = this.productoL;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
  setFacturas(){
    this.router.navigate(['home/factura']);
  }
  
eliminar : Eliminacion = {
  IdFactura: 0,
  NumeroFactura: ""
}
  DeleteFacturas(event: any) {
    this.eliminar.IdFactura = event.idFactura
    this.eliminar.NumeroFactura = event.numeroFactura
    this.facturas.deleteFactura(this.eliminar).subscribe(resp => {
      if (resp) {
        Swal.fire({
          title: "Excelente!",
          text: `${resp.mensajeDescripcion}: ${this.factura?.NumeroFactura }`,
          icon: "success",
          confirmButtonColor: "rgb(10, 83, 58)",
          confirmButtonText: "Aceptar",
          showCloseButton: true
        });
        this.getFacturas()
      } else {
        this.mensajeria = resp
          Swal.fire("Ups!", "Ubo un error al intentar eliminar: " + this.mensajeria.mensajeDescripcion, "error");
      }
    });
  }
  verFactura(event: any){

  }
  
}
