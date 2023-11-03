import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMedicosComponent } from './historial-medicos.component';

describe('HistorialMedicosComponent', () => {
  let component: HistorialMedicosComponent;
  let fixture: ComponentFixture<HistorialMedicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialMedicosComponent]
    });
    fixture = TestBed.createComponent(HistorialMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
