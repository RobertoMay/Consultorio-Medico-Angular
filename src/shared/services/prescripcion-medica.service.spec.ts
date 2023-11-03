import { TestBed } from '@angular/core/testing';

import { PrescripcionMedicaService } from './prescripcion-medica.service';

describe('PrescripcionMedicaService', () => {
  let service: PrescripcionMedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescripcionMedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
