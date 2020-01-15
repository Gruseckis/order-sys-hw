import { ImportedOrder, ImportStatus } from '../models/order';

export const getImportStateMock = (expand = {} ): ImportedOrder => {
  return {
      selectedOrder: null,
      productVariation: [],
      selectedProducts: [],
      importStatus: ImportStatus.OrderSelection,
      ...expand
  };
};
