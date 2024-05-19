import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewForPsychologist } from './overview-psychologist/overviewP.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Attendances } from './attendance/user-attendance.component';
import { CreateWorkshop } from './create-workshop/create-workshop.component';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    OverviewForPsychologist,
    Attendances,
    CreateWorkshop
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})
export class OverviewForPsychologistModule { }
