import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-description-dialog',
  templateUrl: './session-description-dialog.component.html',
  styleUrls: ['./session-description-dialog.component.css'],
})
export class SessionDescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SessionDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
