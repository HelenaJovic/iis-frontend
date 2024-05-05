import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; // Dodati FormControl
import { User } from '../../../model/User';
import { UserProfileService } from '../user-profile.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentsOverviewComponent } from '../../internship-test/students-overview/students-overview.component';
import { StudentTest } from 'src/app/model/studentTest.model';
import { InternshipTestService } from '../../internship-test/internship-test.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  profileForm!: FormGroup;
  isEditing: boolean = false;
  userRole: string = '';
  userClaims: any = null;
  studentTest!: StudentTest;

  constructor(private fb: FormBuilder, private testService: InternshipTestService, private service: UserProfileService, private authService: AuthServiceService, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(loggedIn => {
      if (loggedIn) {
        const token = localStorage.getItem('token');
        this.userClaims = this.authService.decodeToken();
        this.userRole = this.userClaims.role[0].authority; // Adjust according to actual token structure
      } else {
        this.userRole = '';
      }
    });

    //this.testService.getByStudentId(this.user?.id || 1).subscribe({
      
    this.studentTest.points = 82;
    this.studentTest.isReviewed = true;
      
    

    this.profileForm = this.fb.group({ // Inicijalizacija profileForm
      id: [''],
      password: [''],
      name: [''],
      lastName: [''],
      username: [''],
      email: [''],
      roles: [[]] // Postavljanje roles kao prazan niz
    });

    const token = localStorage.getItem('token'); // Dobijanje tokena iz lokalnog skladišta
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("Token: ", decodedToken);

      const email = decodedToken.sub;
      // Poziv funkcije koja dohvaća korisnika na osnovu email adrese
      this.service.getUserByEmail(email).subscribe({
        next: (user: User) => {
          this.user = user; // Postavljanje pronađenog korisnika
          console.log("User: ", user);

          this.profileForm.patchValue({
            id: user.id,
            password: user.password,
            name: user.name,
            lastname: user.lastName,
            username: user.username,
            email: user.email,
            roles: user.roles
          });
        },
        error: (err: any) => {
          console.error('Error fetching user:', err);
        }
      });
    } else {
      console.error('Token not found in local storage.');
    }
  }

  updateProfile() {
    this.isEditing = !this.isEditing;
  
    if (this.isEditing) {
      this.profileForm.enable();
      // Popunjavamo polja forme sa trenutnim podacima korisnika
      this.loadProfileData();
    } else {
      this.profileForm.disable();
    }
  }
  

  saveChanges() {
    console.log('Form value:', this.profileForm.value);

    

    const updatedData = {
      id: this.profileForm.value.id,
      password: this.profileForm.value.password,
      name: this.profileForm.value.name,
      lastName: this.profileForm.value.lastName,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      roles: this.user?.roles || []
    };

    this.service.updateProfile(updatedData, 1).subscribe({
      next: (data: any) => {
        console.log('Profile updated successfully:', data);
        this.loadProfileData();
      },
      error: (err: any) => {
        console.error('Error updating profile:', err);
      }
    });

    this.isEditing = !this.isEditing;
  
    if (this.isEditing) {
      this.profileForm.enable();
      // Popunjavamo polja forme sa trenutnim podacima korisnika
      this.loadProfileData();
    } else {
      this.profileForm.disable();
    }
  }

  loadProfileData() {
    const token = localStorage.getItem('token'); // Dobijanje tokena iz lokalnog skladišta
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("Token: ", decodedToken);

      const email = decodedToken.sub;
      // Poziv funkcije koja dohvaća korisnika na osnovu email adrese
      this.service.getUserByEmail(email).subscribe({
        next: (user: User) => {
          this.user = user; // Postavljanje pronađenog korisnika
          console.log("User: ", user);

          this.profileForm.patchValue({
            id: user.id,
            password: user.password,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roles: user.roles
          });
        },
        error: (err: any) => {
          console.error('Error fetching user:', err);
        }
      });
    } else {
      console.error('Token not found in local storage.');
    }
  }
}

