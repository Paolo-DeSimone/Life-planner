import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'HomePage',
    component: HomePageComponent,
    title: 'Home page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registrazione',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Recupero password',
  },
];
