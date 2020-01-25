/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarStructureService } from './calendar-structure.service';

describe('Service: CalendarStructure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarStructureService]
    });
  });

  it('should ...', inject([CalendarStructureService], (service: CalendarStructureService) => {
    expect(service).toBeTruthy();
  }));
});
