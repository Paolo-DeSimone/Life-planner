import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'loginSelector',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],

})
export class Login {
  title = 'Login';
  email: string = '';
  password: string = '';

  login() {
    console.log('Login');
  }
}