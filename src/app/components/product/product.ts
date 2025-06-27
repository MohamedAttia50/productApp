import { Component, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../services/http service/product-service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart service/cart-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})

export class Product {
private productService=inject(ProductService);
private cartService=inject(CartService);
private router=inject(Router);


productsArr = signal<any[]>([]);

constructor(){
  effect(()=>{
    console.log(this.productsArr());
  })
}


ngOnInit(){
  this.productService.getProducts().subscribe({
    next:(data:any)=> {this.productsArr.set(data.products);
    },
    error:err=> console.error('faild to load products ',err)
  });
}


addToCart(product:any ,e:Event){
  this.cartService.addToCart(product);
  e.stopPropagation();
}

removeFromCart(productId:number,e:Event){
  this.cartService.removeFromCart(productId);
  e.stopPropagation();
}

isInCart(productId:number){
 return this.cartService.isInCart(productId);
}

getCartCount(){
  this.cartService.cartCount();
}


goToDetails(id:number){
  this.router.navigate(['/product', id])
}

getStarIcons(rating:number){
  return this.cartService.getStarIcons(rating);
}

}
