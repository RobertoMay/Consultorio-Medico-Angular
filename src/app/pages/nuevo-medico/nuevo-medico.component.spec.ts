import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMedicoComponent } from './nuevo-medico.component';

describe('NuevoMedicoComponent', () => {
  let component: NuevoMedicoComponent;
  let fixture: ComponentFixture<NuevoMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoMedicoComponent]
    });
    fixture = TestBed.createComponent(NuevoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
