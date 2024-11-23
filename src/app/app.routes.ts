import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCrudComponent } from './product/product-crud.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { SigninSignupCustomerComponent } from './customer/signin-signup-customer/signin-signup-customer.component';
import { SingleProductComponent } from './product/single-product/single-product.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  // admin
  // { path: 'admin', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  // product
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-crud', component: ProductCrudComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'cate/:id', component: ProductListComponent },
  //cart
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'placeorder', component: PlaceOrderComponent },

  //customer
  { path: 'customersign', component: SigninSignupCustomerComponent },
];
