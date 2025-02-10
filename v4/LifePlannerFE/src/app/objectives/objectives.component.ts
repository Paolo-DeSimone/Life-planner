import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
import { ObjectiveDetailDialogComponent } from '../objective-detail-dialog/objective-detail-dialog.component';

@Component({
  selector: 'app-objectives',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Dichiarato FormsModule per evitare errori con ngModel
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css'],
})
export class ObjectivesComponent {
  ObjectiveList: ObjMembers[] = [
    {
      id: 1,
      name: 'Obiettivo Alpha',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
      generalData: { description: 'Questo è il primo obiettivo' },
      completed: false,
    },
    {
      id: 2,
      name: 'Obiettivo Beta',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-15'),
      generalData: { description: 'Questo è il secondo obiettivo' },
      completed: true,
    },
    {
      id: 3,
      name: 'Obiettivo Gamma',
      startDate: new Date('2025-03-20'),
      endDate: new Date('2025-04-20'),
      generalData: { description: 'Questo è il terzo obiettivo' },
      completed: false,
    },
    {
      id: 1,
      name: 'Obiettivo Alpha',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
      generalData: { description: 'Questo è il primo obiettivo' },
      completed: false,
    },
    {
      id: 2,
      name: 'Obiettivo Beta',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-15'),
      generalData: { description: 'Questo è il secondo obiettivo' },
      completed: true,
    },
    {
      id: 3,
      name: 'Obiettivo Gamma',
      startDate: new Date('2025-03-20'),
      endDate: new Date('2025-04-20'),
      generalData: { description: 'Questo è il terzo obiettivo' },
      completed: false,
    },
    {
      id: 1,
      name: 'Obiettivo Alpha',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
      generalData: { description: 'Questo è il primo obiettivo' },
      completed: false,
    },
    {
      id: 2,
      name: 'Obiettivo Beta',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-15'),
      generalData: { description: 'Questo è il secondo obiettivo' },
      completed: true,
    },
    {
      id: 3,
      name: 'Obiettivo Gamma',
      startDate: new Date('2025-03-20'),
      endDate: new Date('2025-04-20'),
      generalData: { description: 'Questo è il terzo obiettivo' },
      completed: false,
    },
    {
      id: 1,
      name: 'Obiettivo Alpha',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
      generalData: { description: 'Questo è il primo obiettivo' },
      completed: false,
    },
    {
      id: 2,
      name: 'Obiettivo Beta',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-15'),
      generalData: { description: 'Questo è il secondo obiettivo' },
      completed: true,
    },
    {
      id: 3,
      name: 'Obiettivo Gamma',
      startDate: new Date('2025-03-20'),
      endDate: new Date('2025-04-20'),
      generalData: { description: 'Questo è il terzo obiettivo' },
      completed: false,
    }
  ];

  selectedObjectives: Record<number, boolean> = {}; // ✅ Inizializzato come oggetto vuoto con numeri come chiavi

  constructor(private dialog: MatDialog) {}

  openPopup(objective: ObjMembers, event: Event) {
    if (this.selectedObjectives[objective.id!]) return; // ✅ Se la checkbox è selezionata, non aprire il popup

    this.dialog.open(ObjectiveDetailDialogComponent, {
      data: objective,
      width: '400px',
    });
  }
}

export interface ObjMembers {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  generalData?: Record<string, any>;
  completed?: boolean;
}
