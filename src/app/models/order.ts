export interface TestOrder {
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
  selectedOrder: Order;
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

export interface CustomerAddress {
  city: string;
  street: string;
  postalCode: string;
}

export type OrderStatus = 'Shipped'
                          | 'Processing'
                          | 'Finalized'
                          | 'Packaging'
                          | 'Delivered';

export interface Order {
  id: number;
  customerName: string;
  customerSurname: string;
  customerAddress: CustomerAddress;
  createDate?: string;
  orderStatus?: OrderStatus;
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
