import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImportedOrder } from 'src/app/models/order';
import { ImportOrderServiceService } from '../../import-order-service/import-order-service.service';

@Component({
  selector: 'app-find-order-step',
  templateUrl: './find-order-step.component.html',
  styleUrls: ['./find-order-step.component.css']
})
export class FindOrderStepComponent implements OnInit {
  public importState$: Observable<ImportedOrder>;

  constructor(private importOrderService: ImportOrderServiceService) {}

  public ngOnInit(): void {
    this.importState$ = this.importOrderService.importedOrder$;
  }
}
