export const routes = {
  auth: {
    home: '/',
    login: '/login',
    register: '/register'
  },
  product: {
    list: '/product',
    add: '/product/create',
    edit: '/product/edit/:id'
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
  employee: {
    add: '/employee/create'
  }
}
