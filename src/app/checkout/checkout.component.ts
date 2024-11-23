import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CartProduct, Order } from '../core/models/object-model';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  @ViewChild('checkoutModal') checkoutModal: any;
  @ViewChild('closeCheckoutModel') closeCheckoutModel: any;
  cartList: CartProduct[] = [];
  subPrice = 0;
  totalPrice = 0;
  shipping = 3;
  ckeckoutForm!: FormGroup;
  submitted = false;
  isSubmittedPayMethod = false;
  orderDataForm!: Order;
  orderData!: Order;
  paymentMethod = 'credit';
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.checkoutModal.nativeElement.click();
    }, 500);

    this.cartList = this.cartService.cartList;
    this.ckeckoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      contact: ['', Validators.required],
    });
    this.getTotalPrice();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ckeckoutForm.controls;
  }

  getTotalPrice() {
    this.subPrice = this.cartList.reduce((c, t1) => t1.qty * +t1.price + c, 0);
    console.log(this.subPrice);

    this.totalPrice = +this.subPrice - this.shipping;
  }

  placeOrder() {
    // console.log('paymentMethod');
    // console.log(this.paymentMethod);

    this.orderDataForm = {
      ...this.orderDataForm,
      paymentMethod: this.paymentMethod,
    };

    this.router.navigateByUrl('placeorder');
  }

  getOrderInfo() {
    const userId = localStorage.getItem('user_session_id') || {};

    var str = new Date();
    var dt = new Date(str).toISOString();

    this.orderDataForm = {
      userId: +userId,
      address: this.ckeckoutForm.value.address,
      city: this.ckeckoutForm.value.city,
      state: this.ckeckoutForm.value.state,
      zipCode: this.ckeckoutForm.value.zipCode,
      contact: this.ckeckoutForm.value.contact,
      orderDateTime: dt,
      totalPrice: this.totalPrice,
      name: this.ckeckoutForm.value.name,
    };
    this.closeCheckoutModel.nativeElement.click();
    //console.log(this.orderData);
  }
}
