import { Component, OnInit } from '@angular/core';
import { CurrentInternshipService } from '../current-internship.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { User } from 'src/app/model/User';
import { Student } from 'src/app/model/student.model';
import { StudentInternship, StudentInternshipPriority, StudentInternshipStatus, Task } from 'src/app/model/studentInternship.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-internship-tasks',
  templateUrl: './internship-tasks.component.html',
  styleUrls: ['./internship-tasks.component.css']
})
export class InternshipTasksComponent implements OnInit {
  
  userClaims: any = null;
  userRole: string = '';
  studentInternship: StudentInternship | undefined;
  showNewTaskForm: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;


  constructor(
    private service: CurrentInternshipService, 
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserProfileService,
    private sanitizer: DomSanitizer){}

    ngOnInit(): void {
      this.authService.loginStatus$.subscribe(loggedIn => {
        if (loggedIn) {
          const token = localStorage.getItem('token');
          this.userClaims = this.authService.decodeToken();
          this.userRole = this.userClaims.role[0].authority;
        } else {
          this.userRole = '';
        }
      });
    
      const email = this.userClaims.sub;
      console.log(email);
    
      this.userService.getUserByEmail(email).subscribe({
        next: (user: User) => {
          if (this.userRole == 'ROLE_PSYCHOLOG') {
            this.service.getByPsychologistId(1).subscribe({
              next: (studentInternship: StudentInternship) => {
                this.studentInternship = studentInternship;
              }
            });
          } else if (this.userRole == 'ROLE_STUDENT') {
            this.service.getByStudentId(2).subscribe({
              next: (studentInternship: StudentInternship) => {
                this.studentInternship = studentInternship;
              }
            });
          }
        }
      });
    }
    


  getStatusColor(status: StudentInternshipStatus): string {
    switch (status) {
        case StudentInternshipStatus.NOT_REVIEWED:
            return 'green';
        case StudentInternshipStatus.IN_PROGRESS:
            return 'orange';
        case StudentInternshipStatus.DONE:
            return 'blue';
        case StudentInternshipStatus.STUCK:
            return 'red';
        default:
            return 'black'; 
    }
}

getPriorityColor(priority: StudentInternshipPriority): string {
  switch (priority) {
      case StudentInternshipPriority.HIGH:
          return 'cyan';
      case StudentInternshipPriority.MEDIUM:
          return 'indigo';
      case StudentInternshipPriority.LOW:
          return 'skyblue'; 
      default:
          return 'black';
  }
}

newTask() : void {
  this.showNewTaskForm = true;
}

handleTaskCreated(task: any) {
  console.log('New Task Created:', task);
  this.showNewTaskForm = false; 

  const newTask: Task = {
    title: task.title,
    priority: task.priority,
    description: task.description,
    status: StudentInternshipStatus.STUCK,
    studentInternshipId: this.studentInternship?.id || 0,
    pdfUrl: ''
  };

  this.service.createNewTask(newTask).subscribe({
    next: () => {
      if(this.userRole ==  'ROLE_PSYCHOLOG'){
        this.service.getByPsychologistId(1).subscribe({
            next: (studentInternship : StudentInternship) => {
                this.studentInternship = studentInternship;
            }
        })
      }
      else if (this.userRole == 'ROLE_STUDENT'){
        this.service.getByStudentId(2).subscribe({
          next: (studentInternship : StudentInternship) => {
            this.studentInternship = studentInternship;
          }
        })
      }
    }
  });
}

handleCheckboxChange(event: any, task: any) {
  if (event.target.checked) {
    console.log('Checkbox checked for task:', task);
    this.openFilePicker(task);
  } else {
    console.log('Checkbox unchecked for task:', task);
    task.pdfUrl = null; 
  }
}

confirmReview(event: Event, task: any) {
  const isConfirmed = confirm('Are you sure you want to review this task?');
  if (isConfirmed) {
    this.review(event, task);
  } else {
    (event.target as HTMLInputElement).checked = false;
  }
}

review(event: any, task: any) {
  task.status = StudentInternshipStatus.DONE;
  this.service.updateTask(task).subscribe({
    next: () => {
      if(this.userRole ==  'ROLE_PSYCHOLOG'){
        this.service.getByPsychologistId(1).subscribe({
            next: (studentInternship : StudentInternship) => {
                this.studentInternship = studentInternship;
            }
        })
      }
      else if (this.userRole == 'ROLE_STUDENT'){
        this.service.getByStudentId(2).subscribe({
          next: (studentInternship : StudentInternship) => {
            this.studentInternship = studentInternship;
          }
        })
      }
    }
  });
}

openFilePicker(task: any) {
  const inputElement: HTMLInputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.accept = 'application/pdf'; 
  inputElement.addEventListener('change', (event) => this.handleFileSelected(event, task));
  inputElement.click();
}

handleFileSelected(event: Event, task: any) {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  if (file) {
    this.readPdf(file, task);
  }
}

readPdf(file: File, task: any) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileUrl = e.target?.result as string;
    task.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  };
  reader.readAsDataURL(file);
}

uploadPdf(task: any): void {
 // const blob = this.dataURLtoBlob(task.pdfUrl);
    //const fileName = `${task.title}.pdf`;

    //this.service.uploadPdf(blob, fileName).subscribe({
    //next: () => {
      window.alert('PDF successfully uploaded');
      task.status = StudentInternshipStatus.NOT_REVIEWED;
      task.pdfUrl = null;
    //},
    //error: () => {
    //  console.error('Error uploading PDF');
    //}
 // })
}

dataURLtoBlob(dataURL: any): Blob {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

}
