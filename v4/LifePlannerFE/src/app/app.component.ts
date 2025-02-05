import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login.component';

@Component({
  selector: 'app-root',
  // Rimuovi questa riga
  // imports: [Login],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [Login]
})
export class AppComponent {
  title = 'LifePlannerFE';
}
