
import { Component } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';
import { Psychologist } from 'src/app/model/psychologist.model';
import { FeedbackWorkshopDto } from 'src/app/model/feedback.model';
import { WorkshopEvaluationDto } from 'src/app/model/testEvaluation.model';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'one-workshop-psychologist.',
  templateUrl: './one-workshop-psychologist.component.html',
  styleUrls: ['./one-workshop-psychologist.component.css']
})
export class ShowWorkshopPsychologist {
  editMode = false; // Inicijalno, nismo u režimu izmene
  workshopEvaluation :WorkshopEvaluationDto={
    workshopName: '',
    femaleParticipation: 0,
    maleParticipation: 0,
    finalGrade: 0,
    totalNumberOfFeedback: 0,
    totalNumberOfParticipants: 0,
    gradeByFemale: 0,
    gradeByMale: 0,
    totalContentGrade: 0,
    totalPsychologicalGrade: 0,
    totalOrgGrade: 0,
    totalPriceGrade: 0,
    numberRecommended: 0,
    numberNotRecommended: 0
  }
    psiholog:Psychologist={
        id: 0,
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        roles: [],
        biography: '',
        image:''
      }
      
      ulogovaniUser:User={
        id: 0,
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        roles: []
      }
  workshop:Workshop={
    id: 0,
    name: 'Mindfulness for Beginners',
    description: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    category: null,
    online: false,
    price: 50,
    images: [],
    psychologistId: 0,
    hallId: 0,
    tests: []
  };
  feedbacks:FeedbackWorkshopDto[]=[];
  workshopId: number=0;
  loggedInUser:number=0;

  constructor(private workshopService: WorkshopService, private router: Router,private activedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService){

  }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(params => {
        this.workshopId = +params['workshopId']; 
        console.log('Workshop ID:', this.workshopId);
        console.log('I am here')
      });

      this.workshopService.getTestEvaluationByWorkshopId(this.workshopId).subscribe({
        next: (response: any) => {
          console.log('evaluation', response);
          this.workshopEvaluation=response;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
      


    
      this.getWorkshopById();
      this.getPsyhologist(this.workshopId);
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
  
    saveChanges(id:number):void{
      console.log("Updating workshop with description: ", this.workshop.description);
      this.workshopService.updateWorkshop(this.workshop,id).subscribe({
        next: () => {
          console.log('Workshop updated successfully');
          this.editMode=false;
        },
        error: (error) => console.error('Failed to update workshop', error)
      });
    }
  
    GetReport(id: number): void {
      const doc = new jsPDF();
      const imgData = '/assets/psiho.jpg'; // Base64 encoded image

      // Add image to the PDF
      doc.addImage(imgData, 'JPEG', 10, 10, 190, 30); // Adjust dimensions as needed
      // Document Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18); // Larger size for the title
      doc.setTextColor(31, 78, 121); // Dark blue color for the title
      doc.text('Workshop Evaluation Report', 105, 50, { align: 'center' }); // Centered title
    
      // Subtitle with Workshop Name
      doc.setFontSize(14); // Smaller than title but larger than normal text
      doc.setTextColor(40, 64, 94); // Slightly lighter shade of blue for the subtitle
      doc.text(`Workshop Name: ${this.workshopEvaluation.workshopName}`, 105, 60, { align: 'center' }); // Centered subtitle
    
      // Reset properties for the body text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(70, 70, 70); // Dark grey color for body text
    
      // Array of details to include in the report
      const details = [
        `Female Participation: ${this.workshopEvaluation.femaleParticipation}`,
        `Male Participation: ${this.workshopEvaluation.maleParticipation}`,
        `Final Grade: ${this.workshopEvaluation.finalGrade.toFixed(2)}`,
        `Total Number of Feedbacks: ${this.workshopEvaluation.totalNumberOfFeedback}`,
        `Total Number of Participants: ${this.workshopEvaluation.totalNumberOfParticipants}`,
        `Average Grade by Females: ${this.workshopEvaluation.gradeByFemale.toFixed(2)}`,
        `Average Grade by Males: ${this.workshopEvaluation.gradeByMale.toFixed(2)}`,
        `Total Content Grade: ${this.workshopEvaluation.totalContentGrade.toFixed(2)}`,
        `Total Psychological Grade: ${this.workshopEvaluation.totalPsychologicalGrade.toFixed(2)}`,
        `Total Organization Grade: ${this.workshopEvaluation.totalOrgGrade.toFixed(2)}`,
        `Total Price Grade: ${this.workshopEvaluation.totalPriceGrade.toFixed(2)}`,
        `Number Recommended: ${this.workshopEvaluation.numberRecommended}`,
        `Number Not Recommended: ${this.workshopEvaluation.numberNotRecommended}`
      ];
    
      // Print each detail on the PDF
      details.forEach((line, index) => {
        doc.text(line, 20, 70 + (index * 7)); // Start text 45mm from top, 7mm between lines
      });
    
      // Adding a footer
      doc.setTextColor(150, 150, 150); // Light grey color for the footer
      doc.setFontSize(10);
      doc.text('This report was generated automatically.', 105, 285, { align: 'center' }); // Centered footer
    
      // Save the PDF
      doc.save('Workshop_Evaluation_Report.pdf');
    }
    
    

    getPsyhologist(id:number):void{
        this.workshopService.getPsycholog(id).subscribe({
            next: (psycholog: Psychologist) => {
              this.psiholog = psycholog;
              console.log
            },
            error: (error: any) => {
              console.error(error);
            }
          });
      }

    Manage(id:number):void{
      this.editMode = !this.editMode;
      console.log(this.editMode)
    }

     
    getWorkshopById() {
    this.workshopService.getWorkshopById(this.workshopId).subscribe({
      next: (response) => {
        console.log('Useri', response);
        // Assuming response is an array of workshop objects:
        this.workshop = response;
        console.log(this.workshop)
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

 


}
   
  
  
