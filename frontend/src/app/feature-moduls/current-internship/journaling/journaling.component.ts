import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JournalingTasks } from 'src/app/model/journalingTasks.model';

@Component({
  selector: 'app-journaling',
  templateUrl: './journaling.component.html',
  styleUrls: ['./journaling.component.css']
})
export class JournalingComponent {
  constructor(
    public dialogRef: MatDialogRef<JournalingComponent>,
    @Inject(MAT_DIALOG_DATA) public journaling: JournalingTasks
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
