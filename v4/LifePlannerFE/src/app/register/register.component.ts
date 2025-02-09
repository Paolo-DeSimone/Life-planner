import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserController } from '../Controllers/UserController';
import { NgModel, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterModule]
})
export class RegisterComponent {
  
  email: string = '';
  password: string = '';

  constructor(private userController: UserController, private router: Router) {}

  async register() {
    const user = await this.userController.RegisterUser(this.email, this.password);
  }

}
