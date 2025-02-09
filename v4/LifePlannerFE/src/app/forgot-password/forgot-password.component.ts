import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  imports: [RouterModule, FormsModule],
})
export class ForgotPasswordComponent {
  email: string = '';
  password: string = '';

  resetPassword() {
    console.log('reset password');
  }
}
