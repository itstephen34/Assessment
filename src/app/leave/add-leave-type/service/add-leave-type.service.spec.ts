import { TestBed } from '@angular/core/testing';

import { AddLeaveTypeService } from './add-leave-type.service';

describe('AddLeaveTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddLeaveTypeService = TestBed.get(AddLeaveTypeService);
    expect(service).toBeTruthy();
  });
});
