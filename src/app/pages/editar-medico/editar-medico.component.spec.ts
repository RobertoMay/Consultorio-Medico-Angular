import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMedicoComponent } from './editar-medico.component';

describe('EditarMedicoComponent', () => {
  let component: EditarMedicoComponent;
  let fixture: ComponentFixture<EditarMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMedicoComponent]
    });
    fixture = TestBed.createComponent(EditarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
