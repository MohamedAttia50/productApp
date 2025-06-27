import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/product/product').then(m => m.Product)
  },
  {
    path:'login' ,loadComponent :()=> import('./components/login/login').then(m=>m.Login)
  },
  {
    path:'register',loadComponent:()=> import('./components/register/register').then(m=> m.Register)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails),
   
  },
  {
    path:'cartItem',
    loadComponent: () => import('./components/cart-item/cart-item').then( m=> m.CartItem)
  },
  {
    path:'**',
    loadComponent:()=> import('./components/not-found/not-found').then(m=> m.NotFound)
  }

];