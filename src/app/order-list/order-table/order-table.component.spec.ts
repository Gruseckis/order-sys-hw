import { TestBed } from '@angular/core/testing';
import { OrderTableComponent } from './order-table.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { getOrderMock } from '../order.mocks.spec';
import { OrderItemDetailsComponent } from '../order-item-details/order-item-details.component';
import { SimpleChange } from '@angular/core';

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    });
    dialog = TestBed.get(MatDialog);
    component = new OrderTableComponent(dialog);
  });

  it('should open dialog onItemClick', () => {
    spyOn(dialog, 'open');
    component.onItemClick(getOrderMock());
    expect(dialog.open).toHaveBeenCalledWith(OrderItemDetailsComponent, {
      width: '60vw',
      data: getOrderMock(),
    });
  });

  it('should set table data and pagination on change', () => {
    expect(component.dataSource.data.length).toBe(0);
    const change = new SimpleChange(null, [getOrderMock()], false);
    component.ngOnChanges({tableData: change});
    expect(component.dataSource.data).toEqual([getOrderMock()]);
  });
});
