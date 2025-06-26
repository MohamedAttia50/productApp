import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart service/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItem {
route=inject(ActivatedRoute)

private cartService=inject(CartService);

cartItems =computed(()=>this.cartService.getCartlist())


remove(productId:number){
  this.cartService.removeFromCart(productId)
}

increment(productId:number){
  this.cartService.incrementProduct(productId);
}

decrement(productId:number){
  this.cartService.decrementProduct(productId);
}

totalPrice = computed(()=>
this.cartService.getCartlist().reduce((acc:number , product:any)=>{
  return acc +product.price *product.quantity
},0)
)

}
