import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'shop/:id',
    loadComponent: () => import('./features/shop/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/shop/cart/cart.component')
      .then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/users.component')
        .then(m => m.UsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/products/products.component')
          .then(m => m.ProductsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/categories/categories.component')
          .then(m => m.CategoriesComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/orders.component')
          .then(m => m.OrdersComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'shop' }
];