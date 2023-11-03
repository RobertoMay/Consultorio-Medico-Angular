import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHistorialPagosComponent } from './editar-historial-pagos.component';

describe('EditarHistorialPagosComponent', () => {
  let component: EditarHistorialPagosComponent;
  let fixture: ComponentFixture<EditarHistorialPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHistorialPagosComponent]
    });
    fixture = TestBed.createComponent(EditarHistorialPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
