import { TestBed } from '@angular/core/testing';

import { PintarMapaService } from './pintar-mapa.service';

describe('PintarMapaService', () => {
  let service: PintarMapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PintarMapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
