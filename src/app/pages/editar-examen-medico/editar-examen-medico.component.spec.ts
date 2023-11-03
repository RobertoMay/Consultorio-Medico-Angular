import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExamenMedicoComponent } from './editar-examen-medico.component';

describe('EditarExamenMedicoComponent', () => {
  let component: EditarExamenMedicoComponent;
  let fixture: ComponentFixture<EditarExamenMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarExamenMedicoComponent]
    });
    fixture = TestBed.createComponent(EditarExamenMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
