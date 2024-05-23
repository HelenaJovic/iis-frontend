import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './infrastructure/router/app-routing.module';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { TestForUser } from './feature-moduls/workshop/workshop-test/workshop-test.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverviewForUser } from './feature-moduls/workshop/overview-user/overview-user.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FailRegistrationComponent } from './infrastructure/auth/register/fail-registration/fail-registration.component';
import { SuccessfullRegistrationComponent } from './infrastructure/auth/register/successfull-registration/successfull-registration.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { HomeComponent } from './feature-moduls/layout/home/home.component';
import { NavbarComponent } from './feature-moduls/layout/navbar/navbar.component';
import { FooterComponent } from './feature-moduls/layout/footer/footer.component';
import { RegisterPsychologistComponent } from './feature-moduls/sysem-admin/register-psychologist/register-psychologist.component';
import { UserProfileComponent } from './feature-moduls/user-profile/user-profile/user-profile.component';
import { OverviewForPsychologist } from './feature-moduls/workshop/overview-psychologist/overviewP.component';
import { Attendances } from './feature-moduls/workshop/attendance/user-attendance.component';
import { CreateWorkshop } from './feature-moduls/workshop/create-workshop/create-workshop.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ShowWorkshop } from './feature-moduls/workshop/one-workshop/one-workshop.component';
import { ShowWorkshopPsychologist } from './feature-moduls/workshop/one-workshop-psychologist/one-workshop-psychologist.component';
import { WorkshopsUser } from './feature-moduls/workshop/workshops-by-user/workshops-by-user.component';
import { CreateQuestionsComponent } from './feature-moduls/create-questions/create-questions.component';
import { TestOverviewComponent } from './feature-moduls/test-overview/test-overview.component';
import { TestResultsComponent } from './feature-moduls/test-results/test-results.component';
import { Chart } from 'chart.js';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FailRegistrationComponent,
    SuccessfullRegistrationComponent,
    RegisterPsychologistComponent,
    CreateWorkshop,
    UserProfileComponent,
    OverviewForPsychologist,
    Attendances,
    OverviewForUser,
    ShowWorkshop,
    // MatDatepickerModule,
    ShowWorkshopPsychologist,
    WorkshopsUser,
    TestForUser,


    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CreateQuestionsComponent,
    TestOverviewComponent,
    TestResultsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // Default timeOut for messages
      positionClass: 'toast-bottom-right', // Default position of toasts
      preventDuplicates: true, // Prevent duplicate toasts
    }), 
    MatDatepickerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatCheckboxModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
