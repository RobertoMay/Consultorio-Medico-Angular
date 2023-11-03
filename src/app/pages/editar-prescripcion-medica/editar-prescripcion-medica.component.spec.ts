import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrescripcionMedicaComponent } from './editar-prescripcion-medica.component';

describe('EditarPrescripcionMedicaComponent', () => {
  let component: EditarPrescripcionMedicaComponent;
  let fixture: ComponentFixture<EditarPrescripcionMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPrescripcionMedicaComponent]
    });
    fixture = TestBed.createComponent(EditarPrescripcionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
