import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginSignoutService } from '../../admin/services/login-signout.service';
import { User } from '../../core/models/object-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-signup-customer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signin-signup-customer.component.html',
  styleUrl: './signin-signup-customer.component.css',
})
export class SigninSignupCustomerComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  loginSignoutService = inject(LoginSignoutService);
  router = inject(Router);

  signupForm!: FormGroup;
  formStatus = false;
  submitted = false;
  signupUser!: User;
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobNumber: ['', Validators.required],
      gender: ['', Validators.required],
      role: [''],
      age: ['', Validators.required],
    });
  }
  switchMode() {
    this.formStatus = !this.formStatus;
  }
  onLogin(formValue: NgForm) {
    if (!this.formStatus) {
      const email = formValue.value.email;
      const password = formValue.value.password;

      this.loginSignoutService.Login(email, password).subscribe((userdata) => {
        if (userdata.length > 0) {
          localStorage.setItem('user_session_id', userdata[0].id);
          localStorage.setItem('role', userdata[0].role);
          if (userdata[0].role == 'admin') {
            this.router.navigateByUrl('admin-dashboard');
          } else {
            this.router.navigateByUrl('product-list');
          }
        } else {
          alert('this account is not found');
        }
      });
    }
  }
  onSignup() {
    this.submitted = true;

    console.log(this.signupForm.value);
    if (!this.signupForm.valid) {
      return;
    }
    this.signupUser = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      mobNumber: this.signupForm.value.mobNumber,
      gender: this.signupForm.value.gender,
      role: 'customer',
      age: this.signupForm.value.age,
    };

    this.loginSignoutService.signup(this.signupUser).subscribe((userdata) => {
      if (userdata.length > 0) {
        localStorage.setItem('user_session_id', userdata[0].id);
        localStorage.setItem('role', userdata[0].role);
        this.router.navigateByUrl('product-list');
      } else {
        alert('somthing error');
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
