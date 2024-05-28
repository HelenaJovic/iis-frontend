
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
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.id; // Pretpostavljam da se 'id' nalazi ovde
  
      if (userId) {
        this.getAllWorkshops(userId);
      } else {
        console.error('User ID not found in token');
      }
    } else {
      console.error('No token found');
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
    this.router.navigate(['/workshopPsychologist/', workshopId]);
    console.log('Manage button clicked for workshop ID:', workshopId);
  }
  
  Attendances(workshopId: number): void {
  this.router.navigate(['/attendances/', workshopId]);
  console.log('Attendances button clicked for workshop ID:', workshopId);
  }
  CreateNewOne():void{
    this.router.navigate(['/createWorkshop']);

  }


//   showOneCompany(company:Company){
//     this.router.navigate(['/oneCompany/', company.id]);
//   }
 
}
   
  
  
