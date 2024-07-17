import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewfacturaComponent } from './previewfactura.component';

describe('PreviewfacturaComponent', () => {
  let component: PreviewfacturaComponent;
  let fixture: ComponentFixture<PreviewfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewfacturaComponent]
    });
    fixture = TestBed.createComponent(PreviewfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
