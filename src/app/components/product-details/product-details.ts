import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/http service/product-service';
import { CartService } from '../../services/cart service/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [ CommonModule ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
  standalone: true
})

export class ProductDetails {
productService=inject(ProductService);
cartService=inject(CartService);
route=inject(ActivatedRoute);
id=Number(this.route.snapshot.paramMap.get('id'));
product=signal<any>(null)
counter=signal(1)

ngOnInit(){
  this.productService.getProducts().subscribe({
    next:(data:any)=>{
      const found = data.products.find((p:any)=> p.id===this.id);
      this.product.set(found)
    },
    error:(err:any)=> console.error(err)
  })
}

decriment(productId:number){
  if(this.counter()>1){
  this.cartService.decrementProduct(productId);
  this.counter.set(this.counter() -1)
  }
  
}

incriment(productId:number){
  if(this.product().stock > this.counter() )
  {
    this.cartService.incremintProduct(productId);
    this.counter.set(this.counter() +1)
  }
  
    
}

isInCart(productId:number){
  return this.cartService.isInCart(productId)
}

addToCart(product:any){
this.cartService.addToCart(product, this.counter())
}

removeFromCart(productId:number){
  this.cartService.removeFromCart(productId)
}

getStarIcons(rating:number){
 return this.cartService.getStarIcons(rating)
}
}
