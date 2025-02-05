import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Login } from './login/login'; // Importa il componente

@NgModule({
  declarations: [
    AppComponent,
    Login // Aggiungi il componente qui
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // L'app parte da AppComponent
})
export class AppModule { }
