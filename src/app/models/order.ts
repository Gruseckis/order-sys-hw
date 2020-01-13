export interface Order {
  orderGuid: string;
  orderNumber: string;
  customerName: string;
  customerSurname: string;
  creatDate: string;
  cost: string;
  price: string;
  fulfillment: string;
}

export interface ImportedOrder {
  selectedOrder: SearchResult;
  selectedProducts: Array<Product>;
  productVariation: Array<ProductVariation>;
  importStatus: ImportStatus;
}

export interface Product {
  SKU: string;
  productName: string;
  price: number;
  isSelected?: boolean;
  variation?: string;
}

export interface SearchResult {
  id: number;
  customerName: string;
  customerSurname: string;
  products: Array<Product>;
}

export interface ProductVariationOption {
  code: string;
  description: string;
  icon: string;
}

export interface ProductVariation {
  SKU: string;
  variation: string;
}

export enum ImportStatus {
  OrderSelection = 'OS',
  ProductPreparation = 'PP',
  ConfirmOrder = 'CO',
  CompleteImport = 'CI'
}
