import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoFacturaComponent } from './nuevo-factura.component';

describe('NuevoFacturaComponent', () => {
  let component: NuevoFacturaComponent;
  let fixture: ComponentFixture<NuevoFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoFacturaComponent]
    });
    fixture = TestBed.createComponent(NuevoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
