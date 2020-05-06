import { TestBed } from '@angular/core/testing';

import { DatosApiService } from './datos-api.service';

describe('DatosApiService', () => {
  let service: DatosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
