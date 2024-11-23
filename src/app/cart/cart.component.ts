import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CartProduct } from '../core/models/object-model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  totalPrice = 0;
  ngOnInit(): void {}

  onDeleteCart(cartItem: CartProduct) {
    this.cartService.deleteCart(cartItem);
  }

  preview() {
    const userId = localStorage.getItem('user_session_id');
    if (userId) {
      this.router.navigateByUrl('checkout');
    } else {
      this.router.navigateByUrl('customersign');
    }
  }
}
