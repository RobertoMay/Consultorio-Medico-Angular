import { TestBed } from '@angular/core/testing';

import { ExamenMedicoService } from './examen-medico.service';

describe('ExamenMedicoService', () => {
  let service: ExamenMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
