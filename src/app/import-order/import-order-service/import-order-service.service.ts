import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import produce from 'immer';
import {
  ImportedOrder,
  Order,
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
  private _selectedOrder: Order;

  public readonly importedOrder$ = this._importOrder$.asObservable();
  public orderFound = new Subject<boolean>();

  get importedOrder(): ImportedOrder {
    return this._importOrder$.getValue();
  }

  private setImportedOrder(state: ImportedOrder) {
    this._importOrder$.next(state);
  }

  public selectImportedOrder(order: Order) {
    if (!order) {
      this.reset();
    } else {
      const state = this.importedOrder;
      const newState = produce(state, draft => {
        draft.selectedOrder = order;
      });
      this.setImportedOrder(newState);
    }
  }

  public selectImportedProduct(product: Product) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      const replica = draft.selectedProducts.find(
        item => item.SKU === product.SKU
      );
      if (!replica) {
        draft.selectedProducts.push(product);
        const selected = draft.selectedOrder.products.find(
          item => item.SKU === product.SKU
        );
        selected.isSelected = true;
      } else {
        draft.selectedProducts = draft.selectedProducts.filter(
          item => item.SKU !== product.SKU
        );
        draft.productVariation = draft.productVariation.filter(
          item => item.SKU !== product.SKU
        );
        const selected = draft.selectedOrder.products.find(
          item => item.SKU === product.SKU
        );
        selected.isSelected = false;
      }
      return draft;
    });
    this.setImportedOrder(newState);
  }

  public selectOrder(order: Order) {
    this._selectedOrder = order;
  }

  public changeImportStatus(status: ImportStatus) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      draft.importStatus = status;
    });
    this.setImportedOrder(newState);
  }

  public selectProductVariant(variantCode: string, productSKU: string) {
    const state = this.importedOrder;
    const newState = produce(state, draft => {
      const product = draft.selectedProducts.find(
        item => item.SKU === productSKU
      );
      product.variation = variantCode;
      const replica = draft.productVariation.find(
        item => item.SKU === productSKU
      );
      if (replica) {
        replica.variation = variantCode;
      } else {
        draft.productVariation.push({
          SKU: productSKU,
          variation: variantCode
        });
      }
      return draft;
    });
    this.setImportedOrder(newState);
  }

  public reset() {
    this.setImportedOrder(initialState);
  }

  public getSelectedOrder(): Order {
    return this._selectedOrder;
  }
}
