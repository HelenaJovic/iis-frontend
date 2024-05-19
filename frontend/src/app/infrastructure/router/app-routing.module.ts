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
import { OverviewForPsychologist } from 'src/app/feature-moduls/workshop/overview-psychologist/overviewP.component';
import { Attendances } from 'src/app/feature-moduls/workshop/attendance/user-attendance.component';
import { CreateWorkshop } from 'src/app/feature-moduls/workshop/create-workshop/create-workshop.component';
import { OverviewForUser } from 'src/app/feature-moduls/workshop/overview-user/overview-user.component';
import { ShowWorkshop } from 'src/app/feature-moduls/workshop/one-workshop/one-workshop.component';
import { ShowWorkshopPsychologist } from 'src/app/feature-moduls/workshop/one-workshop-psychologist/one-workshop-psychologist.component';
import { WorkshopsUser } from 'src/app/feature-moduls/workshop/workshops-by-user/workshops-by-user.component';
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
    path:'workshopUser',
    component: WorkshopsUser,
  },
  {
    path: 'oneWorkshop/:workshopId',
    component: ShowWorkshop,
  },
  {
    path: 'workshopPsychologist/:workshopId',
    component: ShowWorkshopPsychologist,
  },
  {
    path:'overviewUser',
    component:OverviewForUser
  },
  {
    path: 'createWorkshop',
    component: CreateWorkshop
  },
  { path: 'attendances/:workshopId', component: Attendances },

  {
    path: 'register-psychologist',
    component: RegisterPsychologistComponent
  },{
    path: 'workshops',
    component: OverviewForPsychologist,
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
