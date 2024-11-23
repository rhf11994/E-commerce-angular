import { Injectable } from '@angular/core';
import { CartProduct, Product } from '../../core/models/object-model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: CartProduct[] = [];

  // private cartUpdates = new Subject<string>();
  // public cartUpdates$ = this.cartUpdates.asObservable();

  constructor() {}

  get count() {
    return this.cartList.reduce((c, t1) => t1.qty + c, 0);
  }

  addToCart(productItem: Product) {
    let currentItem = this.cartList;

    let cartItemFilter = currentItem.find((item) => {
      return item.id == productItem.id;
    });

    if (cartItemFilter) {
      cartItemFilter.qty++;
    } else {
      let cartItem = {
        ...productItem,
        qty: 1,
      };

      this.cartList.push(cartItem);
    }

  }

  deleteCart(cartItem: CartProduct) {
    let currentItem = this.cartList;

    let index = currentItem.findIndex((item) => {
      return item.id == cartItem.id;
    });

    if (index >= 0) {
      this.cartList.splice(index, 1);
    }
  }
}
