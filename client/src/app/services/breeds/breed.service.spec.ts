import { TestBed } from '@angular/core/testing';

import { BreedService } from './breed.service';

describe('breedService', () => {
  let service: BreedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
