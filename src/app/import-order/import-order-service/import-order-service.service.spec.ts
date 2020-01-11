/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImportOrderServiceService } from './import-order-service.service';

describe('Service: ImportOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportOrderServiceService]
    });
  });

  it('should ...', inject([ImportOrderServiceService], (service: ImportOrderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
