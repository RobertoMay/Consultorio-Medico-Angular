import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHistorialMedicoComponent } from './nuevo-historial-medico.component';

describe('NuevoHistorialMedicoComponent', () => {
  let component: NuevoHistorialMedicoComponent;
  let fixture: ComponentFixture<NuevoHistorialMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoHistorialMedicoComponent]
    });
    fixture = TestBed.createComponent(NuevoHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
