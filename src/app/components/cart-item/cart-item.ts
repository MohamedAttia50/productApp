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


private cartService=inject(CartService);

cartItem=computed(()=>this.cartService.getCartList())

route=inject(ActivatedRoute)

incermint(productId:number){
  this.cartService.incremintProduct(productId);
}

decremint(productId:number){
  this.cartService.decrementProduct(productId);
}

remove(productId:number){
  this.cartService.removeFromCart(productId)
}

totalPrice=computed(()=>
this.cartItem().reduce((acc:number ,product:any)=>{
  return acc + product.price * product.quantity
},0))

}
