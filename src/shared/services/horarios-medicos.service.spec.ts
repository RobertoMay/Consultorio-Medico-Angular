import { TestBed } from '@angular/core/testing';

import { HorariosMedicosService } from './horarios-medicos.service';

describe('HorariosMedicosService', () => {
  let service: HorariosMedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosMedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
