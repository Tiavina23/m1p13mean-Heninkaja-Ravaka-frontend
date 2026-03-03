import { TestBed } from '@angular/core/testing';

import { Fete } from './fete';

describe('Fete', () => {
  let service: Fete;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fete);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
