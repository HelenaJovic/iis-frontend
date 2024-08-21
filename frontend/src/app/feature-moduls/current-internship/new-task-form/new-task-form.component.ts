import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css']
})
export class NewTaskFormComponent {
  title: string = '';
  priority: string = 'medium';
  description: string = '';

  priorities = [
    { value: 'high', display: 'High' },
    { value: 'medium', display: 'Medium' },
    { value: 'low', display: 'Low' }
  ];

  constructor(
    public dialogRef: MatDialogRef<NewTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitForm() {
    const newTask = {
      title: this.title,
      priority: this.priority,
      description: this.description
    };
    this.dialogRef.close(newTask);
  }

  clearForm() {
    this.title = '';
    this.priority = 'medium';
    this.description = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
