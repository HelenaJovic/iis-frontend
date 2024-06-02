import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
// import { DisplayProfile } from 'src/app/feature-moduls/registeredUser/displayProfile/displayProfile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FailRegistrationComponent } from '../auth/register/fail-registration/fail-registration.component';
import { SuccessfullRegistrationComponent } from '../auth/register/successfull-registration/successfull-registration.component';
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from 'src/app/feature-moduls/layout/home/home.component';
import { RegisterPsychologistComponent } from 'src/app/feature-moduls/sysem-admin/register-psychologist/register-psychologist.component';
import { UserProfileComponent } from 'src/app/feature-moduls/user-profile/user-profile/user-profile.component';
import { StudentsOverviewComponent } from 'src/app/feature-moduls/internship-test/students-overview/students-overview.component';
import { IntershipsOverviewComponent } from 'src/app/feature-moduls/internship-test/interships-overview/interships-overview.component';
import { TestHistoryComponent } from 'src/app/feature-moduls/internship-test/test-history/test-history.component';
import { TestResultsComponent } from 'src/app/feature-moduls/internship-test/test-results/test-results.component';
import { InternshipTasksComponent } from 'src/app/feature-moduls/current-internship/internship-tasks/internship-tasks.component';
import { AllFacultiesComponent } from 'src/app/feature-moduls/faculty/all-faculties/all-faculties.component';
import { AllFairsComponent } from 'src/app/feature-moduls/fair/all-fairs/all-fairs.component';
import { CalendarFairsComponent } from 'src/app/feature-moduls/fair/calendar-fairs/calendar-fairs.component';
import { PublishFairsComponent } from 'src/app/feature-moduls/fair/publish-fairs/publish-fairs.component';
import { VisitFairsComponent } from 'src/app/feature-moduls/fair/visit-fairs/visit-fairs.component';
import { ApplyStudentForTestComponent } from 'src/app/feature-moduls/internship-test/apply-student-for-test/apply-student-for-test.component';
import { FairsByUserComponent } from 'src/app/feature-moduls/fair/fairs-by-user/fairs-by-user.component';
import { FeedbackComponent } from 'src/app/feature-moduls/fair/feedback/feedback.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'failRegistration', component: FailRegistrationComponent },
  { path: 'student-overview', component: StudentsOverviewComponent},
  { path: 'internship-overview', component: IntershipsOverviewComponent},
  { path: 'internship-details/:id', component: StudentsOverviewComponent},
  { path: 'test-history', component: TestHistoryComponent},
  { path: 'test-results/:id', component: TestResultsComponent},
  { path: 'internship-tasks', component: InternshipTasksComponent},
  {
    path: 'successfullyRegistration',
    component: SuccessfullRegistrationComponent,
  },
  {
    path: 'register-psychologist',
    component: RegisterPsychologistComponent
  },
  {
    path: 'organizefair',
    component: AllFacultiesComponent
  },
  {
    path: 'pick-fair',
    component: AllFairsComponent
  },
  { path: 'calendar', 
    component: CalendarFairsComponent 
  },
  { path: 'publishfair', 
    component: PublishFairsComponent 
  },
  {
    path: 'visitfairs', 
    component: VisitFairsComponent 
  },
  {
    path: 'apply-student-for-test',
    component: ApplyStudentForTestComponent
  },
  {
    path: 'my-fairs',
    component: FairsByUserComponent
  },
  {
    path: 'feedback/:extraActivityId',
    component: FeedbackComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
