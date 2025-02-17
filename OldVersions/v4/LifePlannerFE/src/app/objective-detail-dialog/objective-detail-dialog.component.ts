import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjMembers } from '../objectives/objectives.component';
import { DatePipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-objective-detail-dialog',
  templateUrl: './objective-detail-dialog.component.html',
  imports: [CommonModule, DatePipe]
  // Puoi aggiungere un file CSS se necessario
})
export class ObjectiveDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ObjMembers,
    private dialogRef: MatDialogRef<ObjectiveDetailDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
