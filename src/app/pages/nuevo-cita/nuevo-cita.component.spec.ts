import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCitaComponent } from './nuevo-cita.component';

describe('NuevoCitaComponent', () => {
  let component: NuevoCitaComponent;
  let fixture: ComponentFixture<NuevoCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoCitaComponent]
    });
    fixture = TestBed.createComponent(NuevoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
