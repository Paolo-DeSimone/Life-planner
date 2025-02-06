import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
  
})
export class AppComponent {
  title = 'LifePlannerFE';
}
