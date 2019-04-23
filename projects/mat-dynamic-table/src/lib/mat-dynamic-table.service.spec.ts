import { TestBed } from '@angular/core/testing';

import { MatDynamicTableService } from './mat-dynamic-table.service';

describe('MatDynamicTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatDynamicTableService = TestBed.get(MatDynamicTableService);
    expect(service).toBeTruthy();
  });
});
