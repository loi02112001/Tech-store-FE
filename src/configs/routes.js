export const routes = {
  auth: {
    home: '/',
    homeAdmin: '/admin',
    login: '/login',
    register: '/register'
  },
  product: {
    list: '/admin/product',
    add: '/admin/product/create',
    edit: '/admin/product/edit/:id',
    detail: '/product/detail/:id',
    all: '/products/*'
  },
  category: {
    list: '/admin/category',
    add: '/admin/category/create',
    edit: '/admin/category/edit/:id'
  },
  brand: {
    list: '/admin/brand',
    add: '/admin/brand/create',
    edit: '/admin/brand/edit/:id'
  },
  supplier: {
    list: '/admin/supplier'
  },
  productBatch: {
    list: '/admin/product-batch',
    add: '/admin/product-batch/create'
  },
  employee: {
    add: '/admin/employee/create',
    edit: '/admin/employee/edit/:id',
    list: '/admin/employee',
    profile: '/admin/employee/profile'
  },
  cart: {
    list: '/cart',
    checkout: '/cart/checkout'
  },
  promotion: {
    list: '/admin/promotion'
  },
  voucher: {
    list: '/admin/voucher'
  },
  purchase: {
    list: '/purchase'
  },
  user: {
    profile: '/user/profile'
  }
}
