import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoVMResponse } from 'src/app/Interface/Productos';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/Services/Prodcutos/productos.service';
import { SetproductosComponent } from '../../CatalogosRegistros/setproductos/setproductos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  displayedColumns: string[] = ['idProducto', 'codigo', 'nombre', 'precio', 'stock', 'activo', 'fechaCreacion'];
  dataSource: MatTableDataSource<ProductoVMResponse>;

  productoL: any [] = []

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
  setProdutos(){
    const dialogRef = this.matDialog.open(SetproductosComponent, {
      width: '550px',
      height: 'auto',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getProductos()
    });
  }
}
