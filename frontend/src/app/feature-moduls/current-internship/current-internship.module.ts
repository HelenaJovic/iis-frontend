import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipTasksComponent } from './internship-tasks/internship-tasks.component';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { FormsModule } from '@angular/forms';
import { JournalingComponent } from './journaling/journaling.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ChatComponent } from './chat/chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorInternshipsComponent } from './mentor-internships/mentor-internships.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';


@NgModule({
  declarations: [
    InternshipTasksComponent,
    NewTaskFormComponent,
    JournalingComponent,
    ChatComponent,
    MentorInternshipsComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CurrentInternshipModule { }
