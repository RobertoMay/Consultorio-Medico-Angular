import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescripcionMedicaComponent } from './prescripcion-medica.component';

describe('PrescripcionMedicaComponent', () => {
  let component: PrescripcionMedicaComponent;
  let fixture: ComponentFixture<PrescripcionMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescripcionMedicaComponent]
    });
    fixture = TestBed.createComponent(PrescripcionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
