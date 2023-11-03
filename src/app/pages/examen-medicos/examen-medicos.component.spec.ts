import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenMedicosComponent } from './examen-medicos.component';

describe('ExamenMedicosComponent', () => {
  let component: ExamenMedicosComponent;
  let fixture: ComponentFixture<ExamenMedicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenMedicosComponent]
    });
    fixture = TestBed.createComponent(ExamenMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
