import { Order, ImportedOrder, ImportStatus } from '../models/order';

export const getImportOrderMock = (): ImportedOrder => {
  return {
    selectedOrder: {
      id: 1237,
      customerName: 'John',
      customerSurname: 'Doe',
      customerAddress: {
        city: 'New York',
        street: '6540 Lons Ave.',
        postalCode: '45532'
      },
      products: [
        {
          SKU: 'SOCK_101_BIG_1',
          productName: 'Christmas Dog Socks',
          price: 15.25,
          variation: 'CS'
        }
      ],
      orderStatus: 'Processing',
      createDate: '2020-01-15T10:16:58.245Z'
    },
    selectedProducts: [
      {
        SKU: 'SOCK_101_BIG_1',
        productName: 'Christmas Dog Socks',
        price: 15.25,
      }
    ],
    productVariation: [{
      SKU: 'SOCK_101_BIG_1',
      variation: 'CS'
    }],
    importStatus: ImportStatus.CompleteImport
  };
};

export const getOrderMock = (): Order => {
  return {
    id: 1122,
    customerName: 'Jack',
    customerSurname: 'Black',
    orderStatus: 'Shipped',
    createDate: '2019-06-10T12:39:19Z',
    customerAddress: {
      city: 'London',
      street: '65b May Street',
      postalCode: 'WE2390LU'
    },
    products: [
      {
        SKU: 'SOCK_101_SMALL_1',
        productName: 'Children Socks',
        price: 10.05,
        variation: 'LS'
      },
      {
        SKU: 'SOCK_201_SMALL_1',
        productName: 'Children Batman Socks',
        price: 11,
        variation: 'LS'
      }
    ]
  };
};
