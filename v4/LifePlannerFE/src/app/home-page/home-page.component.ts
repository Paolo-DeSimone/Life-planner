import { Component } from '@angular/core';
import { ObjectivesComponent } from '../objectives/objectives.component';
import { MonthlyExpancesComponent } from '../monthly-expances/monthly-expances.component';

@Component({
  selector: 'app-home-page',
  imports: [ObjectivesComponent, MonthlyExpancesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  
  
}
