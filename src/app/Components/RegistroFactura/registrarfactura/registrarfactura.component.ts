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
import { Element, ElementoTabla, ProductoConEstado } from 'src/app/Interface/ProductosconEstado';

@Component({
  selector: 'app-registrarfactura',
  templateUrl: './registrarfactura.component.html',
  styleUrls: ['./registrarfactura.component.css']
})

export class RegistrarfacturaComponent implements OnInit {
  numeroFactura = "";
  myControl = new FormControl('');
  clienteL: ClienteResponse[] = [];
  prodcutosL: ProductoConEstado[] = [];

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
  };
  facturaR: FacturaVMRequest = {
    idFactura: 0,
    numeroFactura: "",
    idCliente: 0,
    subtotal: 0,
    igv: 0,
    total: 0,
    productos: []
  };

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<ElementoTabla>;

  constructor(
    private router: Router,
    private clientes: ClienteService,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private products: ProductosService,
    private facturas: FacturasService
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
    this.ObtenerProductos();
    this.ObtenerNumeroFactura();
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

  ObtenerProductos() {
    this.products.getAllProductos().subscribe(resp => {
      this.prodcutosL = resp.listProductos.map((p: ProductoVMResponse) => ({ ...p, disabled: false }));
    });
  }

  ObtenerNumeroFactura() {
    this.facturas.ObtenerNumeroFactura().subscribe(resp => {
      this.facturaR.numeroFactura = this.numeroFactura = resp;
    });
  }

  private _filter(value: string): ClienteResponse[] {
    const filterValue = value.toLowerCase();
    return this.clienteL.filter(cliente => cliente.rucDni.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    const selectedRucDni = event.option.value;
    this.selectedClient = this.clienteL.find(cliente => cliente.rucDni === selectedRucDni);
    if (this.selectedClient) {
      this.facturaR.idCliente = this.selectedClient.idCliente;
    }
  }

  setClientesCalled: boolean = false;

  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (!this.selectedClient && inputValue && inputValue.length >= 10) {
      if (!this.setClientesCalled) {
        this.setClientesCalled = true;
        setTimeout(() => {
          if (!this.selectedClient) {
            this.clienteReq.rucDni = inputValue;
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

  // addData() {
  //   if (this.prodcutosL.length >= 0) {
  //     const producto = this.prodcutosL[0];

  //     const nuevoProducto = {
  //       cantidad: 1,
  //       selectedProducto: producto,
  //       nombre: producto.nombre,
  //       precio: producto.precio,
  //       codigo: producto.codigo,
  //       disabled: false
  //     };

  //     this.dataSource.data = [...this.dataSource.data, nuevoProducto];

  //     // Agregar el producto a la factura
  //     this.facturaR.Productos.push({
  //       CodigoProducto: producto.codigo,
  //       NombreProducto: producto.nombre,
  //       Precio: producto.precio,
  //       Cantidad: 1,
  //       SubtotalF: producto.precio
  //     });
  //   }
  // }
  addData() {
    if (this.prodcutosL.length >= 0) {
      const producto = this.prodcutosL[0];
  
      const nuevoProducto = {
        cantidad: 1,
        selectedProducto: producto,
        nombre: producto.nombre,
        precio: producto.precio,
        codigo: producto.codigo,
        disabled: false,
        checked: false // Agrega el estado del checkbox
      };
  
      this.dataSource.data = [...this.dataSource.data, nuevoProducto];
    }
  }
  
  onProductChecked(event: any, element: any) {
    element.checked = event.checked;
    if (element.checked) {
      // Agregar el producto a la factura
      this.facturaR.productos.push({
        codigoProducto: element.selectedProducto.codigo,
        nombreProducto: element.selectedProducto.nombre,
        precio: element.selectedProducto.precio,
        cantidad: element.cantidad,
        subtotalF: element.selectedProducto.precio * element.cantidad
      });
    } else {
      // Remover el producto de la factura
      this.facturaR.productos = this.facturaR.productos.filter(p => p.codigoProducto !== element.selectedProducto.codigo);
    }
  }

  removeData() {
    // Remover el último producto añadido (puedes ajustar esto según sea necesario)
    const data = this.dataSource.data;
    if (data.length > 0) {
      const removedProduct = data.pop();
      this.dataSource.data = data;
  
      // Asegúrate de que removedProduct está definido
      if (removedProduct && removedProduct.selectedProducto) {
        this.facturaR.productos = this.facturaR.productos.filter(p => p.codigoProducto !== removedProduct.selectedProducto.codigo);
      }
    }
  }

  onSelectionChanges(event: any, element: any) {
    const selectedProduct = event.value;
    element.selectedProducto = selectedProduct;
  
    // Calcular SubtotalF y redondear a dos decimales
    const subtotalF = parseFloat((selectedProduct.precio * element.cantidad).toFixed(2));
  
    // Actualizar el producto en la factura
    const index = this.facturaR.productos.findIndex(p => p.codigoProducto === element.selectedProducto.codigo);
    if (index !== -1) {
      this.facturaR.productos[index] = {
        codigoProducto: selectedProduct.codigo,
        nombreProducto: selectedProduct.nombre,
        precio: selectedProduct.precio,
        cantidad: element.cantidad,
        subtotalF: subtotalF
      };
    } else {
      this.facturaR.productos.push({
        codigoProducto: selectedProduct.codigo,
        nombreProducto: selectedProduct.nombre,
        precio: selectedProduct.precio,
        cantidad: element.cantidad,
        subtotalF: subtotalF
      });
    }
  }

  porcentajeIVG = 18;

  getSubtotal() {
    const subtotal = this.dataSource.data.reduce((acc, curr) => acc + (curr.cantidad * curr.selectedProducto.precio), 0);
    return parseFloat(subtotal.toFixed(2));
  }

  calculateIGV() {
    const igv = this.getSubtotal() * this.porcentajeIVG / 100;
    return parseFloat(igv.toFixed(2));
  }

  calculateTotal() {
    const total = this.getSubtotal() + this.calculateIGV();
    return parseFloat(total.toFixed(2));
  }

  GuaradarFactura() {
    this.facturaR.subtotal = this.getSubtotal();
    this.facturaR.igv = this.calculateIGV();
    this.facturaR.total = this.calculateTotal();

    this.facturas.CrearFacturaAsync(this.facturaR).subscribe(resp => {
      if (resp) {
        this.goBack()
      }
    });
  }

  goBack() {
    this.router.navigate(['home/documentos']);
  }
  isFacturaValid(): boolean {
    return this.facturaR.numeroFactura !== "" && 
           this.facturaR.idCliente > 0 &&
           this.dataSource.data.length > 0 &&
           this.facturaR.productos.length > 0 &&
           this.facturaR.productos.every(producto => producto.cantidad >= 1);
  }
}