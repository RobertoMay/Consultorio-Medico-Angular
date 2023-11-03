import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHistorialMedicoComponent } from './editar-historial-medico.component';

describe('EditarHistorialMedicoComponent', () => {
  let component: EditarHistorialMedicoComponent;
  let fixture: ComponentFixture<EditarHistorialMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHistorialMedicoComponent]
    });
    fixture = TestBed.createComponent(EditarHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
