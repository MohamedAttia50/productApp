import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
route=inject(ActivatedRoute);
id= Number(this.route.snapshot.paramMap.get('id'));
product = signal<any>(null);
counter=signal(0);

productService=inject(ProductService);
cartService=inject(CartService);

ngOnInit(){
  this.productService.getProducts().subscribe({
    next:(data:any)=>{
      const found=data.products.find((p:any)=>p.id===this.id);
      this.product.set(found)
    },
    error: err => console.error('Failed to load product', err)
  })
}

addToCart(product:any){
  this.cartService.addToCart(product,this.counter())
}

isInCart(productId:number){
return this.cartService.isIncart(productId)
}

removeFromCart(productId:number){
  this.cartService.removeFromCart(productId);
}

decrementProduct(){
  if(this.counter()>0){
    this.counter.set(this.counter() -1)
  }

}
incrementProduct(){
if(this.product().stock>this.counter()){
    this.counter.set(this.counter() +1)
  }
}

getStarIcons(rating:number){
  return this.cartService.getStarIcons(rating);
}
}
