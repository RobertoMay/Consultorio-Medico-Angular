import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFacturaComponent } from './editar-factura.component';

describe('EditarFacturaComponent', () => {
  let component: EditarFacturaComponent;
  let fixture: ComponentFixture<EditarFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFacturaComponent]
    });
    fixture = TestBed.createComponent(EditarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
