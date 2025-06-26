import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart service/cart-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
private cartService=inject(CartService)
private router=inject(Router);


get cartCount():number{  
  return this.cartService.cartCount();
}

goToCart(){
  this.router.navigate(['/cartItem'])
}
}
