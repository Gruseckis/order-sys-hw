import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import produce from 'immer';
import {
  ImportedOrder,
  SearchResult,
  ImportStatus,
  Product
} from 'src/app/models/order';

const initialState: ImportedOrder = {
  selectedOrder: null,
  productVariation: [],
  selectedProducts: [],
  importStatus: ImportStatus.OrderSelection
};

@Injectable({
  providedIn: 'root'
})
export class ImportOrderServiceService {
  private readonly _importOrder$ = new BehaviorSubject<ImportedOrder>(
    initialState
  );
  private _selectedOrder: SearchResult;

  public readonly importedOrder$ = this._importOrder$.asObservable();
  public orderFound = new Subject<boolean>();

  get importedOrder(): ImportedOrder {
    return this._importOrder$.getValue();
  }

  private setImportedOrder(state: ImportedOrder) {
    this._importOrder$.next(state);
  }

  public selectImportedOrder(order: SearchResult) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      draft.selectedOrder = order;
      if (!order) {
        draft.selectedProducts = [];
        draft.importStatus = ImportStatus.OrderSelection;
      }
    });
    this.setImportedOrder(newState);
  }

  public selectImportedProduct(product: Product) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      const replica = draft.selectedProducts.find(
        item => item.SKU === product.SKU
      );
      if (!replica) {
        draft.selectedProducts.push(product);
      } else {
        draft.selectedProducts = draft.selectedProducts.filter(
          item => item.SKU !== product.SKU
        );
      }
      return draft;
    });
    this.setImportedOrder(newState);
  }

  public selectOrder(order: SearchResult) {
    this._selectedOrder = order;
  }

  public changeImportStatus(status: ImportStatus) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      draft.importStatus = status;
    });
    this.setImportedOrder(newState);
  }

  public reset() {
    this.setImportedOrder(initialState);
  }

  public getSelectedOrder(): SearchResult {
    return this._selectedOrder;
  }
}
