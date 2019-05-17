import { TestBed } from '@angular/core/testing';

import { AcessoriosService } from './acessorios.service';

describe('AcessoriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcessoriosService = TestBed.get(AcessoriosService);
    expect(service).toBeTruthy();
  });
});
