import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarfacturaComponent } from './registrarfactura.component';

describe('RegistrarfacturaComponent', () => {
  let component: RegistrarfacturaComponent;
  let fixture: ComponentFixture<RegistrarfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarfacturaComponent]
    });
    fixture = TestBed.createComponent(RegistrarfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
