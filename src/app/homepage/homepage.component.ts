import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../core/models/object-model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);

  ProductList: Product[] = [];
  latestProducts: Product[] = [];
  carouselElement: any = [[]];
  constructor() {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((productsData) => {
      this.ProductList = productsData;
      this.carouselElement = this.chunk(this.ProductList, 4);
    });
  }

  getLastProducts() {
    // this.latestProducts = this.ProductList.slice(
    //   Math.max(this.ProductList.length - 6, 1)
    // );
  }

  filterPerCtegory(cateId: any) {
    this.router.navigate(['cate', cateId]);
  }

  chunk(arr: string | any[], chunkSize: number) {
    let R = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }

    return R;
  }
}
