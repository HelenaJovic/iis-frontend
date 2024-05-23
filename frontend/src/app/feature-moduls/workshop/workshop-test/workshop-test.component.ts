
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

@Component({
  selector: 'app-workshop-test',
  templateUrl: './workshop-test.component.html',
  styleUrls: ['./workshop-test.component.css']
})
export class TestForUser {

  loggedInUser : number=0;
  selectedAnswers: { [questionId: number]: number } = {};
  answers:WorkshopAnswer[]=[];
  workshopId:number=0;
  result:TestResultDto={
    id: 0,
    achievedPoints: 0,
    passed: false,
    workshopTest: undefined,
    registeredUser: undefined
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
    private jwtHelper: JwtHelperService){

  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
        this.workshopId = +params['workshopId']; 
        console.log('Workshop ID:', this.workshopId);
        console.log('I am here')
      });

      this.getTest(this.workshopId );

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userId = decodedToken.id; // Pretpostavljam da se 'id' nalazi ovde
    
      }
    

  }
  onSubmit() {
    console.log(this.selectedAnswers);
  
    this.workshopService.evaluateTest(this.test.id, this.userId, this.answers).pipe(
      switchMap((result: TestResultDto) => {
        console.log('Test result:', result);
        // Proceed to get the test result by user only after the evaluation is done
        return this.workshopService.getTestResultByUser(this.userId);
      })
    ).subscribe({
      next: (result) => {
        this.showResult = true; // Set flag to show result
        this.result = result; // Set the result
        if (this.result.passed) {
          this.runConfetti(); // Run confetti if the test is passed
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  

  retryTest() {
    window.location.reload();

  }
  
  selectAnswer(questionId: number, selectedAnswer: any) {
    this.selectedAnswers[questionId] = selectedAnswer;
    this.answers.push(selectedAnswer);
  }


  
  
 getTest(id:number):void{
    this.workshopService.getTestByWorkshop(id).subscribe({
        next: (test: WorkshopTest) => {
          this.test = test;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
 }

 runConfetti() {
  confetti({
    angle: 60,
    spread: 55,
    particleCount: 100,
    origin: { y: 0.6 }
  });
  confetti({
    angle: 120,
    spread: 55,
    particleCount: 100,
    origin: { y: 0.6 }
  });
}

generateCertificate() {
  const doc = new jsPDF();

  // Add a gold border with a thicker frame
  doc.setLineWidth(2.5);
  doc.setDrawColor(255, 215, 0); // Gold color
  doc.rect(10, 10, 190, 277); // Outer Rect(x, y, width, height)
  doc.setLineWidth(1);
  doc.rect(15, 15, 180, 267); // Inner Rect(x, y, width, height)

  // Title
  doc.setFontSize(26);
  doc.setTextColor(0, 0, 0);
  doc.setFont("times", "bold");
  doc.text('Certificate of Achievement', 105, 50, { align: 'center' });

  // Subtitle
  doc.setFontSize(18);
  doc.setFont("times", "normal");
  doc.text(`This certifies that`, 105, 70, { align: 'center' });

  // Name of the recipient
  doc.setFontSize(22);
  doc.setFont("times", "bolditalic");
  doc.text(`${this.result.registeredUser?.name} ${this.result.registeredUser?.lastName}`, 105, 90, { align: 'center' });

  // Achievement details
  doc.setFontSize(18);
  doc.setFont("times", "normal");
  doc.text(`has successfully passed the`, 105, 110, { align: 'center' });
  doc.setFont("times", "bold");
  doc.text(`${this.test.name}`, 105, 130, { align: 'center' });
  doc.setFont("times", "normal");
  doc.text(`with a score of ${this.result.achievedPoints} points.`, 105, 150, { align: 'center' });

  // Date
  doc.setFontSize(14);
  doc.text('Date:', 30, 240);
  doc.text(new Date().toLocaleDateString(), 50, 240);

  // Signature
  doc.setFontSize(14);
  doc.text('Psychologist Signature:', 140, 240);
  const signatureImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Todd_Strasser_signature.png/1012px-Todd_Strasser_signature.png';
  doc.addImage(signatureImg, 'PNG', 150, 245, 40, 15);

  // Seal or stamp
  const sealImg = 'https://png.pngtree.com/png-clipart/20220604/original/pngtree-seal-gold-certificate-png-image_7931463.png';
  doc.addImage(sealImg, 'PNG', 170, 250, 30, 30);

  // Save the PDF
  doc.save('certificate.pdf');
}





}
   
  
  
