import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPrescripcionMedicaComponent } from './nuevo-prescripcion-medica.component';

describe('NuevoPrescripcionMedicaComponent', () => {
  let component: NuevoPrescripcionMedicaComponent;
  let fixture: ComponentFixture<NuevoPrescripcionMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoPrescripcionMedicaComponent]
    });
    fixture = TestBed.createComponent(NuevoPrescripcionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
