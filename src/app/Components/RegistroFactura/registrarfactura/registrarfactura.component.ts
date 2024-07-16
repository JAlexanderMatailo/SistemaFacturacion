import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from 'src/app/Services/Clientes/cliente.service';
import { ClienteResponse, ClientesVM } from 'src/app/Interface/Clientes';  // Asegúrate de que la importación es correcta
import { MatDialog } from '@angular/material/dialog';
import { SetclientesComponent } from '../../CatalogosRegistros/setclientes/setclientes.component'; // Asegúrate de que la importación es correcta

@Component({
  selector: 'app-registrarfactura',
  templateUrl: './registrarfactura.component.html',
  styleUrls: ['./registrarfactura.component.css']
})

export class RegistrarfacturaComponent implements OnInit {
  numeroFactura = "00000000";
  myControl = new FormControl('');
  clienteL: ClienteResponse[] = [];
  filteredOptions?: Observable<ClienteResponse[]>;

  selectedClient?: ClienteResponse;

  clienteReq: ClientesVM = {
    idCliente: 0,
    rucDni: "",
    nombre: "",
    direccion: "",
    correo: "",
  }

  constructor(
    private router: Router,
    private clientes: ClienteService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.ObtenerClientes();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ObtenerClientes() {
    this.clientes.getAllClientes().subscribe(resp => {
      this.clienteL = resp.listClientes;
      console.log(this.clienteL);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }

  private _filter(value: string): ClienteResponse[] {
    const filterValue = value.toLowerCase();
    return this.clienteL.filter(cliente => cliente.rucDni.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    const selectedRucDni = event.option.value;
    this.selectedClient = this.clienteL.find(cliente => cliente.rucDni === selectedRucDni);
  }

  // onInputChange(event: any) {
  //   const inputValue = event.target.value;
  //   // Si no hay cliente seleccionado y el valor de entrada es válido, llama a setClientes
  //   if (!this.selectedClient && inputValue && inputValue.length >= 10) {
  //     // this.setClientes();
  //     setTimeout(() => {
  //       if (!this.selectedClient) {
  //         this.setClientes(this.clienteReq);
  //       }
  //     }, 3000);
  //   }
  // }
  setClientesCalled: boolean = false
  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (!this.selectedClient && inputValue && inputValue.length >= 10) {
      if (!this.setClientesCalled) {
        this.setClientesCalled = true; // Bandera para asegurar que solo se llame una vez
        //this.setClientes(this.clienteReq);
        setTimeout(() => {
          if (!this.selectedClient) {
            this.clienteReq.rucDni = inputValue
            this.setClientes(this.clienteReq);
          }
        }, 3000);
      }
    } else {
      this.setClientesCalled = false; // Reiniciar la bandera si el valor no cumple la condición
    }
  }
  setClientes(clienteReq: ClientesVM) {
    const dialogRef = this.matDialog.open(SetclientesComponent, {
      width: '450px',
      height: '450px',
      panelClass: 'fondo',
      data: clienteReq
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ObtenerClientes();
    });
  }

  goBack() {
    this.router.navigate(['home/documentos']);
  }
}