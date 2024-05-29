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
import { CreateQuestionsComponent } from 'src/app/feature-moduls/sessions/create-questions/create-questions.component';
import { TestOverviewComponent } from 'src/app/feature-moduls/sessions/test-overview/test-overview.component';
import { TestResultsComponent } from 'src/app/feature-moduls/sessions/test-results/test-results.component';
import { CreateGroupSessionComponent } from 'src/app/feature-moduls/sessions/create-group-session/create-group-session.component';
import { ScheduleSessionComponent } from 'src/app/feature-moduls/sessions/schedule-session/schedule-session.component';
import { SessionOverviewComponent } from 'src/app/feature-moduls/sessions/session-overview/session-overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'failRegistration', component: FailRegistrationComponent },
  {
    path: 'successfullyRegistration',
    component: SuccessfullRegistrationComponent,
  },
  {
    path: 'register-psychologist',
    component: RegisterPsychologistComponent,
  },
  { path: 'create-questions', component: CreateQuestionsComponent },
  { path: 'test-overview', component: TestOverviewComponent },
  { path: 'test-results', component: TestResultsComponent },
  { path: 'create-group-session', component: CreateGroupSessionComponent },
  { path: 'schedule-session', component: ScheduleSessionComponent },
  { path: 'session-overview', component: SessionOverviewComponent },
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
