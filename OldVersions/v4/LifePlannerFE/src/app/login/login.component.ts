import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserController } from '../Controllers/UserController'; // Ensure the path is correct
import { NgModel, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userController: UserController, private router: Router) {}

  async login() {
    const user = await this.userController.LoginInUser(this.email, this.password);
    
    if (user) {
      this.router.navigate(['/HomePage']);
      alert("Login effettuato con successo!");
    } else {
      alert("Credenziali errate o utente non trovato!");
    }
  }
  
}
