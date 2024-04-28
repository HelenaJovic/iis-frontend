
import { Component } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
@Component({
  selector: 'app-overview',
  templateUrl: './overviewP.component.html',
  styleUrls: ['./overviewP.component.css']
})
export class OverviewForPsychologist {

  workshops: Workshop[]=[];
  loggedInUser : number=0;

  ulogovaniUser:User={
    id: 0,
    email: '',
    password: '',
    name: '',
    lastName: '',
    username: '',
    roles: []
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
          this.getAllWorkshops(user.id);

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


getAllWorkshops(id:number) {
    this.workshopService.getAllWorkshops(id).subscribe({
      next: (response: any) => {
        console.log('Radionice', response);
        // Assuming response is an array of workshop objects:
        this.workshops = [...this.workshops, ...response];
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  Manage(workshopId: number): void {
    // Add your logic for managing the workshop here
    console.log('Manage button clicked for workshop ID:', workshopId);
  }
  
  Attendances(workshopId: number): void {
  this.router.navigate(['/attendances/', workshopId]);
  console.log('Attendances button clicked for workshop ID:', workshopId);
  }
  CreateNewOne():void{

  }


//   showOneCompany(company:Company){
//     this.router.navigate(['/oneCompany/', company.id]);
//   }
 
}
   
  
  
