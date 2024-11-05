import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { elvGuard } from './elv.guard';

describe('elvGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => elvGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
