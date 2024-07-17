import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Eliminacion, FacturaVMRequest, FacturaVMResponse } from 'src/app/Interface/Facturas';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import { FacturasService } from 'src/app/Services/Facturas/facturas.service';
import Swal from 'sweetalert2'
import { PreviewfacturaComponent } from '../previewfactura/previewfactura.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['idFactura', 'numeroFactura', 'nombreCliente', 'total', 'codigoProducto', 'nombreProducto', 'acciones'];
  innerDisplayedColumns: string[] = ['codigoProducto'];
  innerDisplayedColumnsP: string[] = ['nombreProducto'];
  dataSource: MatTableDataSource<FacturaVMResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private facturas: FacturasService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getFacturas();
    this.dataSource.filterPredicate = this.customFilterPredicate();
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
  setFacturas() {
    this.router.navigate(['home/factura']);
  }
  getFacturas() {
    this.facturas.getAllFacturas().subscribe(resp => {
      this.dataSource.data = resp.facturaList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  customFilterPredicate() {
    return (data: FacturaVMResponse, filter: string): boolean => {
      const dataStr = `${data.idFactura} ${data.numeroFactura} ${data.cliente.nombre} ${data.total}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  verFactura(element: any) {
    console.log("Data: ", element);
    const dialogRef = this.matDialog.open(PreviewfacturaComponent, {
      width: '560px',
      height: '824px',
      panelClass: 'fondo',
      data: element
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getFacturas()
    });
  }

  DeleteFacturas(element: any) {
    this.facturas.deleteFactura({ IdFactura: element.idFactura, NumeroFactura: element.numeroFactura }).subscribe(resp => {
      if (resp) {
        Swal.fire({
          title: "Excelente!",
          text: `${resp.mensajeDescripcion}: ${element.numeroFactura}`,
          icon: "success",
          confirmButtonColor: "rgb(10, 83, 58)",
          confirmButtonText: "Aceptar",
          showCloseButton: true
        });
        this.getFacturas();
      } else {
        Swal.fire("Ups!", "Hubo un error al intentar eliminar: " + resp.mensajeDescripcion, "error");
      }
    });
  }
}
