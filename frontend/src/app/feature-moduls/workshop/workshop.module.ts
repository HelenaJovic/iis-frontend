import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewForPsychologist } from './overview-psychologist/overviewP.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Attendances } from './attendance/user-attendance.component';



@NgModule({
  declarations: [
    OverviewForPsychologist,
    Attendances
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OverviewForPsychologistModule { }
