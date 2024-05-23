
import { Component } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from '../workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';
import { Psychologist } from 'src/app/model/psychologist.model';
@Component({
  selector: 'one-workshop-psychologist.',
  templateUrl: './one-workshop-psychologist.component.html',
  styleUrls: ['./one-workshop-psychologist.component.css']
})
export class ShowWorkshopPsychologist {
  editMode = false; // Inicijalno, nismo u režimu izmene
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
    private jwtHelper: JwtHelperService){

  }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(params => {
        this.workshopId = +params['workshopId']; 
        console.log('Workshop ID:', this.workshopId);
        console.log('I am here')
      });

      
      


    
      this.getWorkshopById();
      this.getPsyhologist(this.workshopId);
    
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
   
  
  
