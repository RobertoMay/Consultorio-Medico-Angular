import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPersonalComponent } from './editar-personal.component';

describe('EditarPersonalComponent', () => {
  let component: EditarPersonalComponent;
  let fixture: ComponentFixture<EditarPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPersonalComponent]
    });
    fixture = TestBed.createComponent(EditarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
