import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHistorialPagosComponent } from './nuevo-historial-pagos.component';

describe('NuevoHistorialPagosComponent', () => {
  let component: NuevoHistorialPagosComponent;
  let fixture: ComponentFixture<NuevoHistorialPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoHistorialPagosComponent]
    });
    fixture = TestBed.createComponent(NuevoHistorialPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
