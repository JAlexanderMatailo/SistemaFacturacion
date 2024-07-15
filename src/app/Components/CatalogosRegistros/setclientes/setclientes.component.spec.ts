import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetclientesComponent } from './setclientes.component';

describe('SetclientesComponent', () => {
  let component: SetclientesComponent;
  let fixture: ComponentFixture<SetclientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetclientesComponent]
    });
    fixture = TestBed.createComponent(SetclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
