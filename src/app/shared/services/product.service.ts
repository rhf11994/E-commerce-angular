import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, map, Observable, pipe, Subject, tap } from 'rxjs';
import { Category, Product } from '../../core/models/object-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product_url = environment.server_url + '/product/';
  apiService = inject(ApiService);
  products$ = new BehaviorSubject<Product[]>([]);

  category_url = environment.server_url + '/category/';
  onSearchVal = new BehaviorSubject<string>('');
  constructor() {}

  clearItems() {
    this.products$.next([]);
  }
  getItems(): Product[] {
    return this.products$.getValue();
  }
  getAllProducts(): Observable<Product[]> {
    this.clearItems();

    return this.apiService.get(this.product_url).pipe(
      map((data) => {
        return data;
      }),
      tap((products: Product[]) => {
        if (products) {
          this.products$.next(products);
        }
      })
    );
  }
  getProductPerId(id: number): Observable<Product> {
    return this.apiService.get(this.product_url + id);
  }

  addItem(product: Product) {
    let currentItems = this.getItems();
    currentItems.push(product);
    this.products$.next(currentItems);
  }
  addNewProduct(product: Product): Observable<Product> {
    return this.apiService.post(this.product_url, product).pipe(
      tap((res) => {
        if (res) {
          this.addItem(res);
        }
      })
    );
  }

  updateItem(id: number, product: Product) {
    let currentItems = this.getItems();
    if (currentItems.length > 0) {
      let index = currentItems.findIndex((item) => item.id == id);

      if (index >= 0) {
        currentItems[index] = product;
        this.products$.next(currentItems);
        return true;
      }
    }
    return false;
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.apiService.put(this.product_url + id, product).pipe(
      tap((data) => {
        if (data) {
          this.updateItem(id, data);
        }
      })
    );
  }

  deleteItem(id: number) {
    let currentItems = this.getItems();
    if (currentItems) {
      let index = currentItems.findIndex((item) => item.id == id);
      if (index >= 0) {
        currentItems.splice(index, 1);
        this.products$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  deleteProduct(id: number) {
    return this.apiService.delete(this.product_url + id).pipe(
      tap((result) => {
        if (result) {
          this.deleteItem(id);
        }
      })
    );
  }

  // Category Part
  getProductPerCategory(id: number) {
    let currentItems = this.getItems();
    let filteredItems = currentItems.filter((item) => item.categoryId == id);
    return filteredItems;
  }

  getAllCategory(): Observable<Category[]> {
    return this.apiService.get(this.category_url);
  }
}
