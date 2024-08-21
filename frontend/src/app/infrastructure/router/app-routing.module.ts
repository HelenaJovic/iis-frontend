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
import { ChatComponent } from 'src/app/feature-moduls/current-internship/chat/chat.component';
import { MentorInternshipsComponent } from 'src/app/feature-moduls/current-internship/mentor-internships/mentor-internships.component';


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
  { path: 'one-internship-tasks/:id', component: InternshipTasksComponent},
  { path: 'internship-tasks', component: MentorInternshipsComponent},
  {
    path: 'successfullyRegistration',
    component: SuccessfullRegistrationComponent,
  },
  {
    path: 'register-psychologist',
    component: RegisterPsychologistComponent
  },
  {
    path: 'chat', component: ChatComponent
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
