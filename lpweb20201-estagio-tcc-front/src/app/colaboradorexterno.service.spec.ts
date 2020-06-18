import { TestBed } from '@angular/core/testing';

import { ColaboradorexternoService } from './colaboradorexterno.service';

describe('ColaboradorexternoService', () => {
  let service: ColaboradorexternoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboradorexternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
