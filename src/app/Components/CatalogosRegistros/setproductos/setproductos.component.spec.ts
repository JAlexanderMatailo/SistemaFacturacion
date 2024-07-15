import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetproductosComponent } from './setproductos.component';

describe('SetproductosComponent', () => {
  let component: SetproductosComponent;
  let fixture: ComponentFixture<SetproductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetproductosComponent]
    });
    fixture = TestBed.createComponent(SetproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
