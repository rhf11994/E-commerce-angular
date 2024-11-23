import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/object-model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  router = inject(Router);
  searchText = '';

  searchProduct() {
    this.productService.onSearchVal.next(this.searchText);
    console.log(this.searchText);
    
    this.router.navigateByUrl('product-list');
   // this.productService.onSearchVal.next('');
  }
}
