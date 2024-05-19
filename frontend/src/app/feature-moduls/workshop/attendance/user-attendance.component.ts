
import { Component } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';
@Component({
  selector: 'app-user',
  templateUrl: './user-attendance.component.html',
  styleUrls: ['./user-attendance.component.css']
})
export class Attendances {

  users: RegisteredUser[]=[];
  workshopId: number=0;

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
    
      this.getAllUsers();
    
    }
  


getAllUsers() {
    this.workshopService.getAllUsers(this.workshopId).subscribe({
      next: (response: any) => {
        console.log('Useri', response);
        // Assuming response is an array of workshop objects:
        this.users = [...this.users, ...response];
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

 


}
   
  
  
