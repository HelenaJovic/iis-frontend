import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipTasksComponent } from './internship-tasks/internship-tasks.component';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { FormsModule } from '@angular/forms';
import { JournalingComponent } from './journaling/journaling.component';


@NgModule({
  declarations: [
    InternshipTasksComponent,
    NewTaskFormComponent,
    JournalingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CurrentInternshipModule { }
