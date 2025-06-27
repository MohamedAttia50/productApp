import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private cartList = signal<any[]>([]);

  cartCount = signal<number>(0)

  private authService=inject(AuthService);

  private updateCartList(newCart:any[]):void{
    this.cartList.set(newCart)
    this.cartCount.set(newCart.length)
    localStorage.setItem('cart',JSON.stringify(newCart));
  }

  constructor(){
  const savedCart=localStorage.getItem('cart')
  if(savedCart){
    this.updateCartList(JSON.parse(savedCart));
  }
  }


  isInCart(productId: number): boolean {
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
    ]
  }

  addToCart(product: any, quantity: number=1) {

  
    const existingProduct = this.cartList().find((p) => p.id === product.id);
    let updatedCart;

    if(existingProduct){
      updatedCart=this.cartList().map((p)=>{
        if(p.id===product.id){
          return{...p, quantity: p.quantity +quantity > p.stock ? p.stock : p.quantity +quantity};
        }
        return p;
      })
    }else{
      updatedCart =[...this.cartList() , {...product ,quantity}];
    }
    this.updateCartList(updatedCart)
  }

  removeFromCart(productId:number){
  const updatedCart =this.cartList().filter((p)=>p.id !==productId);
  this.updateCartList(updatedCart)
  }

  getCartList(){
    return this.cartList();
  }

  incremintProduct(productId:number){
    const updatedCart =this.cartList().map((p)=>{
      if(p.id ===productId && p.quantity <p.stock){
      return  {...p, quantity: p.quantity +1 }
      }
      return p;
    })
    this.updateCartList(updatedCart)
  }


  decrementProduct(productId:number){
    const updatedCart=this.cartList().map((p)=>{
      if(p.id===productId && p.quantity > 1){
        return{...p, quantity: p.quantity -1}
      }
      return p;
    })
    this.updateCartList(updatedCart);
  }
  
  
}
