import { TestBed } from '@angular/core/testing';
import { ImportOrderStepperComponent } from './import-order-stepper.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from 'src/app/http-request/http-request.service';
import { ImportOrderServiceService } from '../import-order-service/import-order-service.service';
import { MatStepper } from '@angular/material';
import { getMockDialogRef } from 'src/app/utils/helper.spec';
import { getImportStateMock } from '../import-order.mock.spec';
import { ImportStatus } from 'src/app/models/order';

describe('ImportOrderStepperComponent', () => {
  let component: ImportOrderStepperComponent;
  let httpRequestService: HttpRequestService;
  let importOrderService: ImportOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    httpRequestService = TestBed.get(HttpRequestService);
    importOrderService = TestBed.get(ImportOrderServiceService);
    component = new ImportOrderStepperComponent(httpRequestService, importOrderService);
    spyOn(importOrderService, 'selectImportedOrder');
    spyOn(httpRequestService, 'importOrderSearch');
    component.dialogRef = getMockDialogRef({
      close: jasmine.createSpy()
    });
  });

  it('should issue empty search on init', () => {
    component.ngOnInit();
    expect(httpRequestService.importOrderSearch).toHaveBeenCalledWith('');
  });

  it('should close dialog on close button click', () => {
    component.onDialogClose();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should deselect imported order', () => {
    component.onOrderDeselect();
    expect(importOrderService.selectImportedOrder).toHaveBeenCalledWith(null);
  });

  it('should deselect order and reset stepper if complete reset', () => {
    const stepperStub = ({
      reset: jasmine.createSpy()
    } as unknown) as MatStepper;
    component.onOrderDeselect(stepperStub);
    expect(importOrderService.selectImportedOrder).toHaveBeenCalledWith(null);
    expect(stepperStub.reset).toHaveBeenCalled();
  });

  it('should call search service if entered pressed', () => {
    const keyPressStub = ({
      key: 'Enter'
    } as unknown) as KeyboardEvent;
    component.searchInput.setValue('123');
    component.onKeyPress(keyPressStub);
    expect(httpRequestService.importOrderSearch).toHaveBeenCalledWith('123');
  });

  it('should not call order search if not enter pressed', () => {
    const keyPressStub = ({
      key: '1'
    } as unknown) as KeyboardEvent;
    component.searchInput.setValue('123');
    component.onKeyPress(keyPressStub);
    expect(httpRequestService.importOrderSearch).not.toHaveBeenCalled();
  });

  it('should change status', () => {
    spyOn(importOrderService, 'changeImportStatus');
    component.onStepChange(ImportStatus.ConfirmOrder);
    expect(importOrderService.changeImportStatus).toHaveBeenCalledWith(ImportStatus.ConfirmOrder);
  });

  it('should close dialog and send selected order', () => {
    spyOnProperty(importOrderService, 'importedOrder').and.returnValue(getImportStateMock());
    component.onImportFinalize();
    expect(component.dialogRef.close).toHaveBeenCalledWith(getImportStateMock());
  });
});
