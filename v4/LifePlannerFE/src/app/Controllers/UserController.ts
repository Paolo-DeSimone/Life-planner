import {Injectable} from '@angular/core';
import {LoginComponent} from '../login/login.component';
@Injectable({
  providedIn: 'root',
})
export class UserController {
  url = 'https://localhost:7211';

  public async RegisterUser(email: string, password: string)
  {
    const response = await fetch(`${this.url}/api/users/create/${email}/${password}`);
    return (await response.json()) ?? {};       
  }
  
  public async LoginInUser(email: string, password: string) {
    try {
      const response = await fetch(`${this.url}/api/users/get/${email}/${password}`);
  
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Errore nel login:", error);
      return null; // Puoi gestire diversamente in base alle necessità
    }
  }
  

}