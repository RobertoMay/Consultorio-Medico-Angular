import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHorarioMedicoComponent } from './nuevo-horario-medico.component';

describe('NuevoHorarioMedicoComponent', () => {
  let component: NuevoHorarioMedicoComponent;
  let fixture: ComponentFixture<NuevoHorarioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoHorarioMedicoComponent]
    });
    fixture = TestBed.createComponent(NuevoHorarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
