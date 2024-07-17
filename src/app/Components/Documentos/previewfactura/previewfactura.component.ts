import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaVMResponse } from 'src/app/Interface/Facturas';

@Component({
  selector: 'app-previewfactura',
  templateUrl: './previewfactura.component.html',
  styleUrls: ['./previewfactura.component.css']
})
export class PreviewfacturaComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FacturaVMResponse
  ) {
    
  }

  goBack(){
    
  }
}
