import { TestBed } from '@angular/core/testing';

import { PropostaEstagioService } from './proposta-estagio.service';

describe('PropostaEstagioService', () => {
  let service: PropostaEstagioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropostaEstagioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
