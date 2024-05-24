
import { Component } from '@angular/core';
import { Workshop, WorkshopCategory } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { Psychologist } from 'src/app/model/psychologist.model';
@Component({
  selector: 'app-workshops-by-user',
  templateUrl: './workshops-by-user.component.html',
  styleUrls: ['./workshops-by-user.component.css']
})
export class WorkshopsUser {

  pastWorkshops: Workshop[]=[];
  futureWorkshops: Workshop[]=[];

  loggedInUser : number=0;
  psychologistImageUrl:string='';
  ulogovaniUser:User={
    id: 0,
    email: '',
    password: '',
    name: '',
    lastName: '',
    username: '',
    roles: []
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
  constructor(private workshopService: WorkshopService, private router: Router,private activedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService){
      

  }

  ngOnInit(): void {
   
    const token = localStorage.getItem('token'); // Retrieving the token from local storage
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("Token: ", decodedToken);
    
      const email = decodedToken.sub;
      // Call the function that fetches the user based on the email address
      this.workshopService.getUserByEmail(email).subscribe({
        next: (user: User) => {
          this.ulogovaniUser = user; // Setting the found user
          console.log("User: ", user);
          this.getPastWorkshops(user.id);
          this.getFutureWorkshops(user.id);

          // Check if user.id exists before setting this.loggedInUser
          if (user.id !== undefined) {
            this.loggedInUser = user.id;
          } else {
            // Handle the case where user.id is undefined
            console.error('User ID is undefined');
            // You might want to redirect the user or show an error message
          }
        },
        error: (err: any) => {
          console.error('Error fetching user:', err);
        }
      });
    
    
    }
  }

  getPsyhologist(id:number):void{
    this.workshopService.getPsycholog(id).subscribe({
        next: (psycholog: Psychologist) => {
          this.psiholog = psycholog;
          console.log
          this.psychologistImageUrl=psycholog.image;
          console.log('url slike j'+this.psychologistImageUrl)
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  takeATest(id:number):void{
   this.router.navigate(['/takingTest/', id]);
 
  }
  rateWorkshop(id:number):void{
    this.router.navigate(['/ratingWorkshop/',id])
  }

  Cancel(id:number) {
    this.workshopService.cancelWorkshop(id).subscribe({
      next: (response) => {
        alert('Workshop cancelled successfully');
      },
      error: (error) => {
        console.error('There was an error cancelling the workshop', error);
      }
    });
  }
  


  getPastWorkshops(id:number) {
    this.workshopService.getPastWorkshops(id).subscribe({
      next: (workshops: any[]) => {
        console.log('Radionice', workshops);
        this.pastWorkshops = [...this.pastWorkshops, ...workshops];

        workshops.forEach(workshop => {
          this.getPsyhologist(workshop.id);  
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getFutureWorkshops(id:number) {
    this.workshopService.getFutureWorkshops(id).subscribe({
      next: (workshops: any[]) => {
        console.log('Radionice', workshops);
        this.futureWorkshops = [...this.futureWorkshops, ...workshops];

        workshops.forEach(workshop => {
          this.getPsyhologist(workshop.id);  
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  
  
  ShowMore(workshopId: number): void {
  this.router.navigate(['/oneWorkshop/', workshopId]);
//   console.log('Attendances button clicked for workshop ID:', workshopId);
  }
//   CreateNewOne():void{
//     this.router.navigate(['/createWorkshop']);

//   }


//   showOneCompany(company:Company){
//     this.router.navigate(['/oneCompany/', company.id]);
//   }
 
}
   
  
  
