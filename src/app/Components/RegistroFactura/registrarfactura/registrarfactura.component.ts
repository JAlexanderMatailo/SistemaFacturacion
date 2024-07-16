import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from 'src/app/Services/Clientes/cliente.service';
import { ClienteResponse, ClientesVM } from 'src/app/Interface/Clientes';  // Asegúrate de que la importación es correcta
import { MatDialog } from '@angular/material/dialog';
import { SetclientesComponent } from '../../CatalogosRegistros/setclientes/setclientes.component'; // Asegúrate de que la importación es correcta
import { MyErrorStateMatcher } from 'src/app/Shared/ErrorStament';
import { FacturaVMRequest } from 'src/app/Interface/Facturas';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/Services/Prodcutos/productos.service';
import { ProductoVMResponse } from 'src/app/Interface/Productos';
import { FacturasService } from 'src/app/Services/Facturas/facturas.service';

@Component({
  selector: 'app-registrarfactura',
  templateUrl: './registrarfactura.component.html',
  styleUrls: ['./registrarfactura.component.css']
})

export class RegistrarfacturaComponent implements OnInit {
  numeroFactura = "";
  myControl = new FormControl('');
  clienteL: ClienteResponse[] = [];
  prodcutosL: ProductoVMResponse[] = []

  filteredOptions?: Observable<ClienteResponse[]>;

  selectedClient?: ClienteResponse;

  productForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;

  clienteReq: ClientesVM = {
    idCliente: 0,
    rucDni: "",
    nombre: "",
    direccion: "",
    correo: "",
  }
  facturaR : FacturaVMRequest = {
    IdFactura: 0,
    NumeroFactura: "",

    IdCliente: 0,
    Subtotal: 0,
    Igv: 0,
    Total: 0,

    CodigoProducto: "",
    NombreProducto: "",

    Precio: 0,
    Cantidad: 0,
    SubtotalF: 0
  }

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource : MatTableDataSource<any>;

  constructor(
    private router: Router,
    private clientes: ClienteService,
    private matDialog: MatDialog,
    private fb: FormBuilder, 
    private products: ProductosService,
    private facturas : FacturasService
  ) { 
    this.dataSource = new MatTableDataSource();
    this.productForm = this.fb.group({
      productosS: ['', Validators.required],
      dsProducto: ['', Validators.required],
      preProducto: ['', Validators.required],
      fRegistro: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.ObtenerClientes();
    this.ObtenerProductos()
    this.ObtenerNumeroFactura()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ObtenerClientes() {
    this.clientes.getAllClientes().subscribe(resp => {
      this.clienteL = resp.listClientes;
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }

  ObtenerProductos(){
    this.products.getAllProductos().subscribe(resp =>{
      this.prodcutosL = resp.listProductos
      console.log(this.prodcutosL);
      
    })
  }
  ObtenerNumeroFactura(){
    this.facturas.ObtenerNumeroFactura().subscribe(resp => {
      this.facturaR.NumeroFactura = this.numeroFactura = resp;
      
    });
  }

  private _filter(value: string): ClienteResponse[] {
    const filterValue = value.toLowerCase();
    return this.clienteL.filter(cliente => cliente.rucDni.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    const selectedRucDni = event.option.value;
    this.selectedClient = this.clienteL.find(cliente => cliente.rucDni === selectedRucDni);
      if(this.selectedClient){
        this.facturaR.IdCliente = this.selectedClient.idCliente
        console.log("Factura",this.facturaR);
        
      }
  }

  setClientesCalled: boolean = false
  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (!this.selectedClient && inputValue && inputValue.length >= 10) {
      if (!this.setClientesCalled) {
        this.setClientesCalled = true; 
        setTimeout(() => {
          if (!this.selectedClient) {
            this.clienteReq.rucDni = inputValue
            this.setClientes(this.clienteReq);
          }
        }, 3000);
      }
    } else {
      this.setClientesCalled = false; 
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

  addData() {
    // const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.data;
    // this.table.renderRows();
  }

  removeData() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }

  goBack() {
    this.router.navigate(['home/documentos']);
  }
}