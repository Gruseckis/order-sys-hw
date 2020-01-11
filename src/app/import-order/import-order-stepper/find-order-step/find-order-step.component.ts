import { Component } from '@angular/core';
import { HttpRequestService } from 'src/app/http-request/http-request.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

export interface Product {
  SKU: string;
  productName: string;
  price: number;
}

export interface SearchResult {
  id: number;
  customerName: string;
  customerSurname: string;
  products: Array<Product>;
}

@Component({
  selector: 'app-find-order-step',
  templateUrl: './find-order-step.component.html',
  styleUrls: ['./find-order-step.component.css']
})
export class FindOrderStepComponent {
  public searchResults$: Observable<Array<SearchResult>>;
  public searchInput = new FormControl('', Validators.required);
  constructor(private httpService: HttpRequestService) {}

  public onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchInput.valid) {
      this.searchResults$ = this.httpService.searchOrder(
        this.searchInput.value
      );
    }
  }
}
