import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosMedicosComponent } from './horarios-medicos.component';

describe('HorariosMedicosComponent', () => {
  let component: HorariosMedicosComponent;
  let fixture: ComponentFixture<HorariosMedicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorariosMedicosComponent]
    });
    fixture = TestBed.createComponent(HorariosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
