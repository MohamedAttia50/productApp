import { Component } from '@angular/core';
import { Product } from "../product/product";
import { ProductService } from '../../services/http service/product-service';

@Component({
  selector: 'app-products',
  imports: [Product],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {


}
