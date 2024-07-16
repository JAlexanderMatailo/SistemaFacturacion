import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ClienteResponse } from 'src/app/Interface/Clientes';
import { ClienteService } from 'src/app/Services/Clientes/cliente.service';

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

  constructor(
    private router: Router,
    private clientes: ClienteService
  ) {}

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
      // Inicializa las opciones de filtrado
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
    console.log(this.selectedClient);
  }

  goBack() {
    this.router.navigate(['home/documentos']);
  }
}