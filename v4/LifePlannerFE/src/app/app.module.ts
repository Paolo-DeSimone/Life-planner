import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Login } from './login/login.component'; // Importa il componente Login

@NgModule({
  declarations: [
  ],
  imports: [
    NgModule,
    BrowserModule,
    AppComponent,
    FormsModule,
    Login, 
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }