import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Category, Product } from '../core/models/object-model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css',
})
export class ProductCrudComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closeUpdateAdd') closeUpdateAdd: any;

  productForm!: FormGroup;
  addEditProduct = false;

  ProductItem!: Product;
  editProductItem!: Product;
  ProductList: Product[] = [];

  file: any;
  imageName = '';
  updatedProductId!: number;
  deletedProductId!: number;
  productList$ = new BehaviorSubject<Product[]>([]);
  categoryList: Category[] = [];
  constructor() {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      prodPhoto: [],
      description: ['',[Validators.required]],
      rating: ['', [Validators.required]],
    });
    this.productList$.subscribe((resData) => {
      this.ProductList = resData;
    });

    this.getAllProducts();
    this.getAllCategories();
  }
  getAllCategories() {
    this.productService.getAllCategory().subscribe((resData) => {
      this.categoryList = resData;
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((resData) => {
      this.ProductList = resData;
    });
  }

  OnAddProductPopup() {
    this.addEditProduct = false;
    this.productForm.reset();
  }
  addNewProduct() {
    if (this.productForm.valid) {
      this.ProductItem = {
        name: this.productForm.value.name,
        categoryName: this.productForm.value.category.name,
        categoryId: this.productForm.value.category.id,
        price: this.productForm.value.price,
        prodPhoto: this.productForm.value.prodPhoto
          ? this.productForm.value.prodPhoto
          : '',
        description: this.productForm.value.description,
        rating: this.productForm.value.rating,
      };
      this.productService
        .addNewProduct(this.ProductItem)
        .subscribe((resData) => {
          if (resData) {
            this.closeUpdateAdd.nativeElement.click();
            console.log('user Added');
          }
        });
    }
    this.productForm.reset();
  }

  onUpdateProductPopUp(productId: number) {
    this.updatedProductId = productId;
    this.addEditProduct = true;
    // uploadPhoto: (this.user_updated_data.uploadPhoto == "" ? this.user_profile_pic : this.user_updated_data.uploadPhoto)
    this.productService.getProductPerId(productId).subscribe((resDate) => {
      this.imageName = resDate.prodPhoto.toString();

      this.editProductItem = {
        name: resDate.name,
        rating: resDate.rating,
        categoryId: resDate.categoryId,
        categoryName: resDate.categoryName,
        price: resDate.price,
        description: resDate.description,
        prodPhoto: '',
      };

      this.productForm.patchValue(this.editProductItem);
    });
  }
  updateProduct() {
    this.editProductItem = {
      name: this.productForm.value.name,
      categoryName: this.productForm.value.category.name,
      categoryId: this.productForm.value.category.id,
      price: this.productForm.value.price,
      prodPhoto:
        this.productForm.value.prodPhoto == ''
          ? this.imageName
          : this.productForm.value.prodPhoto,
      rating: this.productForm.value.rating,
      description: this.productForm.value.description,
    };
    this.productService
      .updateProduct(this.updatedProductId, this.editProductItem)
      .subscribe((resData) => {
        if (resData) {
          this.closeUpdateAdd.nativeElement.click();
          alert('user updated successfuly');
        }
      });
  }

  onDeletePopup(productId: number) {
    this.deletedProductId = productId;
  }
  deletProduct() {
    this.productService
      .deleteProduct(this.deletedProductId)
      .subscribe((resData) => {
        if (resData) {
          this.closebutton.nativeElement.click();
        }
      });
  }

  get name() {
    return this.productForm.get('name');
  }
  get email() {
    return this.productForm.get('email');
  }
  get category() {
    return this.productForm.get('category');
  }
  get price() {
    return this.productForm.get('price');
  }
  get rating() {
    return this.productForm.get('rating');
  }
  get prodPhoto() {
    return this.productForm.get('prodPhoto');
  }
  get description() {
    return this.productForm.get('description');
  }
  uploadImage(event: any) {
    // if (event.target.files[0]) {
    //   this.file = event.target.files[0];
    // }
    // console.log(this.file);
    // this.file = event.target.files[0];
    // console.log(this.file);
  }
}
