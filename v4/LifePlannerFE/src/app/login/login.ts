import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'loginSelector',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [BrowserModule, FormsModule]
})
export class Login {
  title = 'Login';
  email: string = '';
  password: string = '';

  login() {
    console.log('Login');
  }
}
