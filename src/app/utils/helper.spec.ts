import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material';

export const getMockDialogRef = (extend = {}) => {
    return (({
      componentInstance: {},
      afterClosed: jasmine.createSpy().and.returnValue(of({})),
      ...extend
    } as unknown) as MatDialogRef<unknown>);
};
