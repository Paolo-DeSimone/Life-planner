import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, CommonModule } from '@angular/common';
import { ObjectiveDetailDialogComponent } from '../objective-detail-dialog/objective-detail-dialog.component';

@Component({
  selector: 'app-objectives',
  imports: [CommonModule ],
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css'] 
})
export class ObjectivesComponent {
  // Nota: ho aggiornato il tipo in ObjMembers[] per maggiore sicurezza tipizzata
  ObjectiveList: ObjMembers[] = [
    {
      [ObjEnum.id]: 1,
      [ObjEnum.name]: "Obiettivo Alpha",
      [ObjEnum.startDate]: new Date("2025-01-01"),
      [ObjEnum.endDate]: new Date("2025-02-01"),
      [ObjEnum.generalData]: { description: "Questo è il primo obiettivo" },
      [ObjEnum.completed]: false
    },
    {
      [ObjEnum.id]: 2,
      [ObjEnum.name]: "Obiettivo Beta",
      [ObjEnum.startDate]: new Date("2025-02-15"),
      [ObjEnum.endDate]: new Date("2025-03-15"),
      [ObjEnum.generalData]: { description: "Questo è il secondo obiettivo" },
      [ObjEnum.completed]: true
    },
    {
      [ObjEnum.id]: 3,
      [ObjEnum.name]: "Obiettivo Gamma",
      [ObjEnum.startDate]: new Date("2025-03-20"),
      [ObjEnum.endDate]: new Date("2025-04-20"),
      [ObjEnum.generalData]: { description: "Questo è il terzo obiettivo" },
      [ObjEnum.completed]: false
    }
  ];

  constructor(private dialog: MatDialog) { }

  openPopup(objective: ObjMembers) {
    this.dialog.open(ObjectiveDetailDialogComponent, {
      data: objective,
      width: '400px'
    });
  }

}

export enum ObjEnum {
  id = "id",
  name = "name",
  startDate = "startDate",
  endDate = "endDate",
  generalData = "generalData",
  completed = "completed"
}

export type ObjMembers = {
  [ObjEnum.id]?: number;          
  [ObjEnum.name]: string;          
  [ObjEnum.startDate]: Date;   
  [ObjEnum.endDate]: Date;   
  [ObjEnum.generalData]?: Record<string, any>;
  [ObjEnum.completed]?: boolean;   
}
