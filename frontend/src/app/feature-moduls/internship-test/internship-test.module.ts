import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsOverviewComponent } from './students-overview/students-overview.component';
import { FormsModule } from '@angular/forms';
import { IntershipsOverviewComponent } from './interships-overview/interships-overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TestHistoryComponent } from './test-history/test-history.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { InfoDialogComponent } from './info-dialog/busy-hall-dialog.component';
import { BestStudentsDialogComponent } from './best-students-dialog/best-students-dialog.component';
 import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';


@NgModule({
  declarations: [
    StudentsOverviewComponent,
    IntershipsOverviewComponent,
    InfoDialogComponent,
    TestHistoryComponent,
    TestResultsComponent,
    BestStudentsDialogComponent,
    RequestDialogComponent
  ],
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
 
  ]
})
export class InternshipTestModule { }
