import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './infrastructure/router/app-routing.module';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';

import { FailRegistrationComponent } from './infrastructure/auth/register/fail-registration/fail-registration.component';
import { SuccessfullRegistrationComponent } from './infrastructure/auth/register/successfull-registration/successfull-registration.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { HomeComponent } from './feature-moduls/layout/home/home.component';
import { NavbarComponent } from './feature-moduls/layout/navbar/navbar.component';
import { FooterComponent } from './feature-moduls/layout/footer/footer.component';
import { RegisterPsychologistComponent } from './feature-moduls/sysem-admin/register-psychologist/register-psychologist.component';
import { UserProfileComponent } from './feature-moduls/user-profile/user-profile/user-profile.component';
import { CreateQuestionsComponent } from './feature-moduls/sessions/create-questions/create-questions.component';
import { TestOverviewComponent } from './feature-moduls/sessions/test-overview/test-overview.component';
import { TestResultsComponent } from './feature-moduls/sessions/test-results/test-results.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Chart } from 'chart.js';
import { CreateGroupSessionComponent } from './feature-moduls/sessions/create-group-session/create-group-session.component';
import { ScheduleSessionComponent } from './feature-moduls/sessions/schedule-session/schedule-session.component';
import { SessionOverviewComponent } from './feature-moduls/sessions/session-overview/session-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FailRegistrationComponent,
    SuccessfullRegistrationComponent,
    RegisterPsychologistComponent,
    UserProfileComponent,

    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CreateQuestionsComponent,
    TestOverviewComponent,
    TestResultsComponent,
    CreateGroupSessionComponent,
    ScheduleSessionComponent,
    SessionOverviewComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
