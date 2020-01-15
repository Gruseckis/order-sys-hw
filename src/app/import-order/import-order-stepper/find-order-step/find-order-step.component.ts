import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ImportedOrder } from 'src/app/models/order';
import { ImportOrderServiceService } from '../../import-order-service/import-order-service.service';

@Component({
  selector: 'app-find-order-step',
  templateUrl: './find-order-step.component.html',
  styleUrls: ['./find-order-step.component.css']
})
export class FindOrderStepComponent {
  public importState$: Observable<ImportedOrder> = this.importOrderService.importedOrder$;

  constructor(private importOrderService: ImportOrderServiceService) {}
}
