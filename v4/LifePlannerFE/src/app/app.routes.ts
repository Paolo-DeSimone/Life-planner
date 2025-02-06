import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login page'
    },
    {
        path: 'HomePage',
        component: HomePageComponent,
        title: 'Home page'
    }

];
