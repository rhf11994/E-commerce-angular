import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/models/object-model';
import { LoginSignoutService } from '../services/login-signout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  user_data!: User;
  LoginSignoutService = inject(LoginSignoutService);
  router = inject(Router);
  onSubmit(formValue: NgForm) {
    const email = formValue.value.email;
    const password = formValue.value.password;

    this.LoginSignoutService.Login(email, password).subscribe(
      (userdata) => {
        this.user_data = userdata;
        console.log(userdata);

        if (userdata.length == 1) {
          localStorage.setItem('user_session_id', userdata[0].id);
          localStorage.setItem('role', userdata[0].role);
          this.router.navigateByUrl('admin-dashboard');
        } else {
          alert('not valid user');
        }
      }
    );
  }
}
