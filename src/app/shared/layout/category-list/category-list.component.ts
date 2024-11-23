import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../../core/models/object-model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  productService = inject(ProductService);
  // router=inject(Router);
  
  categoryList: Category[] = [];

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    
    this.productService.getAllCategory().subscribe((catData) => {
      this.categoryList = catData;
    });

 
  }

  // filterPerCtegory(cateId: any){
  //   this.router.navigate(['cate',cateId]);
  // }
}
