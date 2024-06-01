
import { Component } from '@angular/core';
import { Workshop, WorkshopCategory } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { Psychologist } from 'src/app/model/psychologist.model';
import { WorkshopTest } from 'src/app/model/workshopTest.model';
import { WorkshopAnswer } from 'src/app/model/workshopAnswer.model';
import { TestResultDto } from 'src/app/model/testResult.model';
import confetti from 'canvas-confetti';
import { switchMap } from 'rxjs';
import { jsPDF } from 'jspdf';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackWorkshopDto } from 'src/app/model/feedback.model';

@Component({
  selector: 'app-rate-workshop',
  templateUrl: './rate-workshop.component.html',
  styleUrls: ['./rate-workshop.component.css']
})
export class RateWorkshop {

  loggedInUser : number=0;
  feedbacks:FeedbackWorkshopDto[]=[];
  workshopId:number=0;
  feedback:FeedbackWorkshopDto={
      contentGrade: 0,
      psychologistGrade: 0,
      finalGrade: 0,
      organizationGrade: 0,
      priceGrade: 0,
      recommended: false,
      comment: '',
      registeredUserId: 0,
      workshopId: 0
  }
  userId:number=0;
  showResult:boolean=false;
  psychologistImageUrl:string='';
  test:WorkshopTest={
      id: 0,
      name: '',
      testQuestions: []
  }

  constructor(private workshopService: WorkshopService, private router: Router,private activedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService,
    private snackBar: MatSnackBar
){

  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
        this.workshopId = +params['workshopId']; 
        console.log('Workshop ID:', this.workshopId);
        console.log('I am here')
      });


      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userId = decodedToken.id; 
    
      }
    this.loadFeedbacks();

  }

  loadFeedbacks() {
    this.workshopService.getFeedbacksByWorkshop(this.workshopId).subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        console.log('feedbacks su'+this.feedbacks)
      },
      error: (error) => console.error('Error fetching feedbacks:', error)
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,  // 5000 milliseconds = 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  submitFeedback() {
    console.log('Submitting feedback:', this.feedback);
    this.feedback.registeredUserId=this.userId;
    this.feedback.workshopId=this.workshopId;
    this.workshopService.createFeedback(this.feedback).subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully', response);
        this.openSnackBar("Feedback submitted successfully!", "OK");
      },
      error: (error) => {
        console.error('Failed to submit feedback', error);
      }
    });
    
}
}
  
  
