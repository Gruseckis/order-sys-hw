import { ImportOrderDialogComponent } from './import-order-dialog.component';
import { getMockDialogRef } from '../../utils/helper.spec';

describe('ImportOrderDialogComponent', () => {
  let component: ImportOrderDialogComponent;

  beforeEach(() => {
    component = new ImportOrderDialogComponent(getMockDialogRef());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
})