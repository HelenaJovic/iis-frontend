import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/feature-moduls/model/User';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/feature-moduls/model/register.model';
import { Workshop, WorkshopCategory } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Hall } from 'src/app/model/hall.model';
import { WorkshopTest } from 'src/app/model/workshopTest.model';
import { WorkshopQuestion } from 'src/app/model/workshopQuestion.model';
import { WorkshopAnswer } from 'src/app/model/workshopAnswer.model';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-create',
  templateUrl: './create-workshop.component.html',
  styleUrls: ['./create-workshop.component.css'],
})
export class CreateWorkshop implements OnChanges {
    categories = Object.values(WorkshopCategory);
    test:WorkshopTest={
      id: 0,
      name: '',
      testQuestions: []
    };
    questions: any[] = []; 
    psychologistId=0;
    isClicked: boolean = false;
    workshopIsClicked:boolean=false;
    testCreationForm: FormGroup | undefined;
    selectedDate = new FormControl();
    halls:Hall[]=[];
    workshopId=0;
    images: File[] = [];  
    imagesWorkshop:String[]=[];
    reservedHall=0;
    isLoading = false;
    isOnline:boolean=false;
    ulogovaniUser:User={
        id: 0,
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        roles: []
      }
  constructor(
    private formBuilder: FormBuilder,
    private workshopService:WorkshopService,
    private service: AuthServiceService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    console.log(this.isOnline)
    
    this.getAllFreeHalls();

    const token = localStorage.getItem('token'); // Retrieving the token from local storage
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);    
      const email = decodedToken.sub;
      this.workshopService.getUserByEmail(email).subscribe({
        next: (user: User) => {
          this.ulogovaniUser = user; 
          console.log("User: ", user);
          if (user.id !== undefined) {
            this.psychologistId = user.id;
          } else {
            console.error('User ID is undefined');
          }
        },
        error: (err: any) => {
          console.error('Error fetching user:', err);
        }
      });
      }  
      this.testCreationForm = this.formBuilder.group({
        testName: ['', Validators.required],
        questions: this.formBuilder.array([])
      });
     
  }
  

  workshopForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: this.selectedDate,
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    isOnline: new FormControl(false),
  });

  testForm = new FormGroup({
    testName: new FormControl('', [Validators.required]),
  });

  questionForm = new FormGroup({
    questionText: new FormControl('', [Validators.required]),
    points: new FormControl(null, [Validators.required, Validators.min(0)]),

  });

  answerForm = new FormGroup({
    answerText: new FormControl('', [Validators.required]),
    isCorrect: new FormControl()  
  });

  onCreateTest() {
    console.log('Test Created:', this.testForm.value);
    this.isClicked=true;
    const test: WorkshopTest = {
      id: 0,
      name: this.testForm.value.testName || '',
      testQuestions: []
    }; 

this.workshopService.createTest(test).subscribe({
  next: () => console.log('Test je'+test),
  error: (error:any) => console.error('Error creating workshop', error)
});
}

  onAddQuestion() {
    const question: WorkshopQuestion = {
      id: 0,
      text: this.questionForm.value.questionText || '',
      pointsPerQuestion: this.questionForm.value.points || 0,
      testAnswers: []
    }; 

this.workshopService.createQuestion(question).subscribe({
  next: () => console.log('Pitanjeeeeeeeee je'+question),
  error: (error:any) => console.error('Error creating workshop', error)
});
this.questions.push(question);
        this.questionForm.reset();
  }

  onAddAnswer() {
    const lastQuestion = this.questions[this.questions.length - 1];
    console.log('False?'+this.answerForm.value.isCorrect)
    const answer: WorkshopAnswer = {
      id: 0,
      text: this.answerForm.value.answerText || '',
      true: this.answerForm.value.isCorrect!,
      isSelected: false,
      workshopQId: lastQuestion.id
    }; 

    console.log('id je'+answer.workshopQId)

this.workshopService.createAnswer(answer).subscribe({
  next: () => console.log('Test je'+answer),
  error: (error:any) => console.error('Error creating answer', error)
});
if (!lastQuestion.answers) {
  lastQuestion.answers = [];  // Inicijalizacija niza ako još nije definisan
}
lastQuestion.answers.push(answer);
this.answerForm.reset();
  }

  getAllFreeHalls() {
    this.workshopService.getAllHalls().subscribe({
      next: (response: any) => {
        console.log('Hale', response);
        // Assuming response is an array of workshop objects:
        this.halls = [...this.halls, ...response];
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  onImageSelected(event: any): void {
    this.imagesWorkshop = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        
        this.images.push(file);
      }
    }
    this.imagesWorkshop.push(...this.images.map(file => `assets/${file.name}`));

    console.log("Slike su" + this.imagesWorkshop)

  }

  openAddHallModal(id:number): void {
    console.log("dodajem halu sa id"+id);
   this.reservedHall=id;
    };

   


  createWorkshop(): void {
    const formValues = this.workshopForm.value;
    console.log("Kliknuto")
    this.workshopIsClicked=true;
    let category: WorkshopCategory = WorkshopCategory.FAMILY_THERAPY;  
    alert('You have successfully created the workshop!');


    if (formValues.category && Object.values(WorkshopCategory).includes(formValues.category as WorkshopCategory)) {
      category = formValues.category as WorkshopCategory;
    } 

    const selectedWorkshopDate: Date | null | undefined =
      formValues.date;
    const workshop: Workshop = {
      id: 0,
      name: this.workshopForm.value.name || '',
      description: this.workshopForm.value.description || '',
      date: selectedWorkshopDate ?? new Date(),
      startTime: this.workshopForm.value.startTime || '',
      endTime: this.workshopForm.value.endTime || '',
      category: category,
      price: formValues.price || 0,
      online: this.workshopForm.value.isOnline || false,
      psychologistId: this.psychologistId,
      images: this.images.map(file => `assets/${file.name}`),
      hallId: this.reservedHall || undefined,
      tests: []
    };

   

    const formData = new FormData();
    Object.keys(workshop).forEach(key => {
        if (key !== 'images') {
            formData.append(key, workshop[key]);
        }
    });

    this.images.forEach((file, index) => {
      const fileWithPath = `assets/${file.name}`;  
      formData.append(`images[${index}]`, file, fileWithPath);
  });

  
  

    this.workshopService.createWorkshop(workshop).subscribe({
        next: () => this.workshopId=workshop.id,
        error: (error) => console.error('Error creating workshop', error)
    });


}
}
