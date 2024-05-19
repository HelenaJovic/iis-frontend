
import { Component } from '@angular/core';
import { Workshop, WorkshopCategory } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { Psychologist } from 'src/app/model/psychologist.model';
@Component({
  selector: 'app-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.css']
})
export class OverviewForUser {

  workshops: Workshop[]=[];
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
  filteredWorkshops: Workshop[]=[]; // Filtrirani niz radionica
  categories = Object.values(WorkshopCategory); // Prebacuje enum u niz za template

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
        this.filteredWorkshops = this.workshops; 

  }

  ngOnInit(): void {
    this.filteredWorkshops = this.workshops; 
   
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
          this.getAllWorkshops();

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

  filterWorkshops(selectedCategory: string) {
    if (selectedCategory === 'all') {
      this.filteredWorkshops = this.workshops;
    } else {
      this.filteredWorkshops = this.workshops.filter(workshop => workshop.category === selectedCategory);
    }
  }
  


  getAllWorkshops() {
    this.workshopService.getWorkshops().subscribe({
      next: (workshops: any[]) => {
        console.log('Radionice', workshops);
        this.workshops = [...this.workshops, ...workshops];
        this.filteredWorkshops = this.workshops; 

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
   
  
  
