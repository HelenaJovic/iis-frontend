import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; // Dodati FormControl
import { User } from '../../../model/User';
import { UserProfileService } from '../user-profile.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentsOverviewComponent } from '../../internship-test/students-overview/students-overview.component';
import { StudentTest } from 'src/app/model/studentTest.model';
import { InternshipTestService } from '../../internship-test/internship-test.service';
import { CurrentInternshipService } from '../../current-internship/current-internship.service';
import { StudentInternship, StudentInternshipPriority, StudentInternshipStatus } from 'src/app/model/studentInternship.model';
import jsPDF from 'jspdf';
import { ReportDto } from 'src/app/model/report.model';

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
  isThereFinishedIntern : boolean = false;
  studentInternship!: ReportDto;

  constructor(private fb: FormBuilder, private internshipService: CurrentInternshipService, private service: UserProfileService, private authService: AuthServiceService, private jwtHelper: JwtHelperService) {}

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
      
    this.isThereFinishedInternship();

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

  isThereFinishedInternship() : void {
      this.internshipService.getFinishedInternshipByStudent(2).subscribe({
        next: (report: ReportDto) =>{
          this.isThereFinishedIntern = true;
          this.studentInternship = report;
        },
        error: (err: any) => {
            this.isThereFinishedIntern = false;
        } 
      })
  }

  getReport(): void {
    const doc = new jsPDF();
    const imgData = '/assets/psiho.jpg';

    doc.addImage(imgData, 'JPEG', 10, 10, 190, 30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 78, 121);
    doc.text(this.studentInternship.internshipTitle, 105, 50, { align: 'center' });

    const endDate = new Date(this.studentInternship.endDate);
    const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`End Date: ${formattedEndDate}`, 180, 20, { align: 'right' });

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Student Information:', 20, 70);

    doc.setFontSize(11);
    doc.setTextColor(70, 70, 70);
    doc.text(`Name: ${this.studentInternship.studentName} ${this.studentInternship.studentLastName}`, 20, 80);
    doc.text(`Points: ${this.studentInternship.studentInternshipPoints}`, 20, 90);

    doc.text(' ', 20, 100); // Empty row

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Mentor Information:', 20, 110);

    doc.setFontSize(11);
    doc.setTextColor(70, 70, 70);
    doc.text(`Name: ${this.studentInternship.psychologistName} ${this.studentInternship.psychologistLastName}`, 20, 120);

    doc.text(' ', 20, 130); // Empty row

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Done Tasks:', 20, 140);

    let yOffset = 150;
    this.studentInternship.tasks.filter(task => task.status === StudentInternshipStatus.DONE).forEach((task, index) => {
      doc.setFontSize(11);
      doc.setTextColor(70, 70, 70);
      doc.text(`${index + 1}. ${task.title}`, 20, yOffset);
      doc.setFontSize(10);
      const splitDescription = doc.splitTextToSize(task.description, 160); 
      doc.text(splitDescription, 20, yOffset + 5);
      yOffset += 15 + splitDescription.length * 5;
    });
    const totalTasks = this.studentInternship.tasks.length;
    const statusCounts = {
      [StudentInternshipStatus.IN_PROGRESS]: 0,
      [StudentInternshipStatus.DONE]: 0,
      [StudentInternshipStatus.NOT_REVIEWED]: 0,
      [StudentInternshipStatus.STUCK]: 0
    };

    this.studentInternship.tasks.forEach(task => {
      statusCounts[task.status]++;
    });

    const statusPercentages = {
      [StudentInternshipStatus.IN_PROGRESS]: (statusCounts[StudentInternshipStatus.IN_PROGRESS] / totalTasks) * 100,
      [StudentInternshipStatus.DONE]: (statusCounts[StudentInternshipStatus.DONE] / totalTasks) * 100,
      [StudentInternshipStatus.NOT_REVIEWED]: (statusCounts[StudentInternshipStatus.NOT_REVIEWED] / totalTasks) * 100,
      [StudentInternshipStatus.STUCK]: (statusCounts[StudentInternshipStatus.STUCK] / totalTasks) * 100
    };

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Task Achievement Analytics:', 20, yOffset + 20);

    yOffset += 30;
    Object.keys(statusPercentages).forEach((status, index) => {
      doc.setFontSize(11);
      doc.setTextColor(70, 70, 70);
      doc.text(`${status}: ${statusPercentages[status as StudentInternshipStatus].toFixed(2)}%`, 20, yOffset + (index * 10));
    });

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text('This report was generated automatically.', 105, 285, { align: 'center' });

    doc.save('Student_Internship_Report.pdf');
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

