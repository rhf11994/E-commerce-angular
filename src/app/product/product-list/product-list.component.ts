import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartProduct, Category, Product } from '../../core/models/object-model';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { CartService } from '../../shared/services/cart.service';
import { json } from 'stream/consumers';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule,FilterPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  productList$ = new BehaviorSubject<Product[]>([]);
  private route = inject(ActivatedRoute);
  cartService = inject(CartService);
  router = inject(Router);
  ProductList: Product[] = [];

  searchText = '';
  cartList: CartProduct[] = [];

  cateId!: number;
  cateId$: Observable<string>;

  filteredProducts: Product[] = [];
  showCategories = false;
  ///////cart Part

  constructor() {
    this.cateId$ = this.route.params.pipe(map((params) => params['id']));
  }
  ngOnInit(): void {
    this.cateId$.subscribe((id) => {
      // console.log(`Product ID: ${id}`);
      this.cateId = +id;

      this.getAllProducts();
    });

    this.productService.onSearchVal.subscribe((data) => {
      this.searchText = data;

      setTimeout(() => {
        this.getAllProducts();
      }, 50);
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((resData) => {
      this.ProductList = resData;

      this.filteredProducts = this.cateId
        ? this.ProductList.filter((p) => {
            return p.categoryId == this.cateId;
          })
        : this.ProductList;
    });
  }

  // getAllProductSearch(searchText: string) {
  //   if (!this.ProductList) return [];
  //   if (!searchText) return this.ProductList;
  //   searchText = searchText.toLowerCase();

  //   return this.ProductList.filter((it) => {
  //     return (
  //       it.name.toLowerCase().includes(searchText) ||
  //       it.categoryName.toLowerCase().includes(searchText) ||
  //       it.price.toLowerCase().includes(searchText)
  //     );
  //   });
  // }
  /////////////cart Part////////////////
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
