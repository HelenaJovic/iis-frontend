import { Component, OnInit } from '@angular/core';
import { InternshipTestService } from '../../internship-test/internship-test.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { InternshipTest } from 'src/app/model/internship.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  userClaims: any = null;
  userRole: string = '';

  constructor(
    private internshipService: InternshipTestService, 
    private notifications: NotificationsService,
    private router: Router,
    private authService: AuthServiceService){}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(loggedIn => {
      if (loggedIn) {
        const token = localStorage.getItem('token');
        this.userClaims = this.authService.decodeToken();
        this.userRole = this.userClaims.role[0].authority; 
      } else {
        this.userRole = '';
      }
    });

    if(this.userRole == 'ROLE_PSYCHOLOG'){
      this.showNotification();
    }
  }

    
  showNotification(): void {
    this.areThereUnreviewedTests()
      .subscribe((isThere: boolean) => {
        console.log("is there: ", isThere)
        if (isThere) {
          const toast = this.notifications.info(
            'There are unchecked tests!',
            'Enter to input results!',
            {
              timeOut: 2500,
              showProgressBar: true,
              clickToClose: true,
            }
          );

          toast.click?.subscribe(() => {
            this.router.navigate(['/test-history']);
          });
        }
      });
  }

  areThereUnreviewedTests(): Observable<boolean> {
    console.log("here");
    return new Observable<boolean>(observer => {
      this.internshipService.getAllInternshipTests().subscribe({
        next: (tests: InternshipTest[]) => {
          let hasUnreviewedTests = false;
          tests.forEach(test => {
            if (!test.testReviewed) {
              hasUnreviewedTests = true;
            }
          });
          console.log("has unreviewed: ", hasUnreviewedTests)
          observer.next(hasUnreviewedTests);
          observer.complete();
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  }
}
