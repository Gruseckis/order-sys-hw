import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material';

export const getMockDialogRef = <T extends unknown>(extend = {}): MatDialogRef<T> => {
    return (({
      componentInstance: {},
      afterClosed: jasmine.createSpy().and.returnValue(of(null)),
      ...extend
    } as T) as MatDialogRef<T>);
};
