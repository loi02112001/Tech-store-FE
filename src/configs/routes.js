export const routes = {
  auth: {
    home: '/',
    login: '/login',
    register: '/register'
  },
  product: {
    list: '/product',
    add: '/product/create',
    edit: '/product/edit/:id',
    detail: '/product/detail/:id'
  },
  shop: '/shop',
  category: {
    list: '/category',
    add: '/category/create',
    edit: '/category/edit/:id'
  },
  brand: {
    list: '/brand',
    add: '/brand/create',
    edit: '/brand/edit/:id'
  },
  supplier: {
    list: '/supplier'
  },
  productBatch: {
    list: '/product-batch',
    add: '/product-batch/create'
  },
  employee: {
    add: '/employee/create'
  },
  cart: '/cart',
  allProducts: '/all-products',
  promotion: {
    list: '/promotion'
  }
}
