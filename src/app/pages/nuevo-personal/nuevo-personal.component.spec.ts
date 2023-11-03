import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPersonalComponent } from './nuevo-personal.component';

describe('NuevoPersonalComponent', () => {
  let component: NuevoPersonalComponent;
  let fixture: ComponentFixture<NuevoPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoPersonalComponent]
    });
    fixture = TestBed.createComponent(NuevoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
