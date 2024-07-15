import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteResponse } from 'src/app/Interface/Clientes';
import { MensajesVM } from 'src/app/Interface/Mensajeria';
import { ClienteService } from 'src/app/Services/Clientes/cliente.service';
import Swal from 'sweetalert2'
import { SetclientesComponent } from '../../CatalogosRegistros/setclientes/setclientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  displayedColumns: string[] = ['idProducto', 'codigo', 'nombre', 'precio', 'stock', 'activo', 'fechaCreacion', 'Acciones'];
  dataSource: MatTableDataSource<ClienteResponse>;

  clienteL: any [] = []

  clienteR: ClienteResponse = {
    IdCliente: 0,
    RucDni: "",
    Nombre: "",
    Direccion: "",
    Correo: "",
    Activo: "",
    FechaCreacion: new Date()
  }

  mensajeria: MensajesVM = {
    codigoResult: 0,
    mensajeDescripcion: ""
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private clientes : ClienteService,
    private matDialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getClientes();
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

  getClientes(){
    this.clientes.getAllClientes().subscribe(resp => {
      this.clienteL = resp.listClientes;
      this.dataSource.data = this.clienteL;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
  setClientes(){
    const dialogRef = this.matDialog.open(SetclientesComponent, {
      width: '450px',
      height: '450px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getClientes()
    });
  }

  UpdateCliente(producto: SetclientesComponent) {
    //localStorage.setItem("usuario", JSON.stringify(person));
    console.log("Data: ",producto);
    
    const dialogRef = this.matDialog.open(SetclientesComponent, {
      width: '550px',
      height: 'auto',
      panelClass: 'fondo',
      data: producto
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getClientes()
    });
  }
  DeleteCliente(event: any) {
    //alert(person.idContribuyente)
    this.clientes.deleteCliente(event.idCliente).subscribe(resp => {
      if (resp) {
        Swal.fire({
          title: "Excelente!",
          text: `${resp.mensajeDescripcion}: ${this.clienteR?.Nombre +' ' + 'con el código:'+ ' ' + this.clienteR?.RucDni}`,
          icon: "success",
          confirmButtonColor: "rgb(10, 83, 58)",
          confirmButtonText: "Aceptar",
          showCloseButton: true
        });
        this.getClientes()
      } else {
        this.mensajeria = resp
          Swal.fire("Ups!", "Ubo un error al intentar eliminar: " + this.mensajeria.mensajeDescripcion, "error");
      }
    });
  }
}
