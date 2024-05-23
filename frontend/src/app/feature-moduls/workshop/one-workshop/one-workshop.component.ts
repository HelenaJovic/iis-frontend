
import { Component, Injector } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';
import { Psychologist } from 'src/app/model/psychologist.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'one-workshop.',
  templateUrl: './one-workshop.component.html',
  styleUrls: ['./one-workshop.component.css']
})
export class ShowWorkshop {
  private toastr: ToastrService | undefined;
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
  workshopId: number=0;
  loggedInUser:number=0;


  constructor(private workshopService: WorkshopService, private router: Router,private activedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private injector: Injector,
    private jwtHelper: JwtHelperService){

  }

  ngOnInit(): void {
    this.toastr = this.injector.get(ToastrService);

    this.activedRoute.params.subscribe(params => {
        this.workshopId = +params['workshopId']; 
        console.log('Workshop ID:', this.workshopId);
        console.log('I am here')
      });

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
        });}
      


    
      this.getWorkshopById();
      this.getPsyhologist(this.workshopId);
    
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

      enrollNow(workshopId: number) {
        this.workshopService.addUserToWorkshop(workshopId, this.loggedInUser).subscribe({
          next: (response) => {
            console.log(response); // "User successfully added to workshop."
            alert('You have successfully enrolled in the workshop!');
          },
          error: (error) => {
            console.error(error); // "Failed to add user to workshop."
            alert('You have successfully enrolled in the workshop!');
          }
        });
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
   
  
  
