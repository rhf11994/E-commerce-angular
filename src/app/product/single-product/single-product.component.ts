import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../core/models/object-model';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent implements OnInit {
  productService = inject(ProductService);
  product!: Product;
  route = inject(ActivatedRoute);
  productId$: Observable<string>;
  productId!: number;
  cartService = inject(CartService);
  constructor() {
    this.productId$ = this.route.params.pipe(map((params) => params['id']));
  }
  ngOnInit(): void {
    this.productId$.subscribe((id) => {
      // console.log(`Product ID: ${id}`);
      this.productId = +id;
      this.getProductPerId();
    });
  }

  getProductPerId() {
    this.productService
      .getProductPerId(this.productId)
      .subscribe((productData) => {
        this.product = productData;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
