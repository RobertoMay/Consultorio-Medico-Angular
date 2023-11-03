import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoExamenMedicoComponent } from './nuevo-examen-medico.component';

describe('NuevoExamenMedicoComponent', () => {
  let component: NuevoExamenMedicoComponent;
  let fixture: ComponentFixture<NuevoExamenMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoExamenMedicoComponent]
    });
    fixture = TestBed.createComponent(NuevoExamenMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
