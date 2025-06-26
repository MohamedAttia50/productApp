import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  private cartList = signal<any>([]);

  getCartlist() {
    return this.cartList();
  }

  cartCount = signal<number>(0);
  counter = signal(0);

  private updateCartList(newCart: any[]){
  this.cartList.set(newCart);
  localStorage.setItem('cart',JSON.stringify(newCart));
  this.cartCount.set(newCart.length)
  }

  constructor(){
    const savedCart=localStorage.getItem('cart');
    if(savedCart){
      this.cartList.set(JSON.parse(savedCart));
      this.cartCount.set(this.cartList().length)
    }
  }

  addToCart(product: any, quantity: number = 1) {

    const existingProduct = this.cartList().find((p: any) => p.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = this.cartList().map((p: any) => {
        if (p.id === product.id) {
          return {
            ...p,
            quantity: p.quantity + quantity > p.stock ? p.stock : p.quantity + quantity
          };
        }
        return p;
      })
    } else {
      updatedCart = [...this.cartList(), { ...product, quantity }]
    }

    this.updateCartList(updatedCart);
  }


  removeFromCart(productId: number) {
    const updatedCart = this.cartList().filter((p: any) => p.id !== productId);
    this.updateCartList(updatedCart)
  }

  isIncart(productId: number): boolean {
    return this.cartList().some((p: any) => p.id === productId);
  }

  getStarIcons(rating: number) {
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 >= .5 ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar;

    return [
      ...Array(fullStar).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStar).fill('empty')
    ];
  }

  incrementProduct(productId: number){
   const updatedCart=this.cartList().map((p:any)=>{
    if(p.id === productId && p.quantity < p.stock){
      return {...p, quantity:p.quantity +1};
    }
    return p;
   })
   this.updateCartList(updatedCart)
  }
  
  decrementProduct(productId: number){
    const updatedCart=this.cartList().map((p:any)=>{
      if(p.id ===productId && p.quantity > 1){
        return {...p, quantity:p.quantity -1};
      }
      return p;
    });
    this.updateCartList(updatedCart)
  }
}
