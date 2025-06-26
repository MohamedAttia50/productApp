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

productsArr = signal<any[]>([]);
addedToCart = signal<boolean>(false);



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
  const savedItem = localStorage.getItem('products');
  if (savedItem !== null) {
    JSON.parse(savedItem);
  }
}

saveToLocalstorage(){
  localStorage.setItem('products',JSON.stringify(this.productsArr()))
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
 return this.cartService.isIncart(productId);
}

getCartCount(){
  this.cartService.cartCount();
}

private router=inject(Router);

goToDetails(id:number){
  this.router.navigate(['/product', id])
}

getStarIcons(rating:number){
  return this.cartService.getStarIcons(rating);
}

}
