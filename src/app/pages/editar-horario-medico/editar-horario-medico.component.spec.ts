import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHorarioMedicoComponent } from './editar-horario-medico.component';

describe('EditarHorarioMedicoComponent', () => {
  let component: EditarHorarioMedicoComponent;
  let fixture: ComponentFixture<EditarHorarioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHorarioMedicoComponent]
    });
    fixture = TestBed.createComponent(EditarHorarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
