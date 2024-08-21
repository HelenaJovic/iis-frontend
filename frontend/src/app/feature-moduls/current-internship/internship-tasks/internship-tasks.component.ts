import { Component, OnInit } from '@angular/core';
import { CurrentInternshipService } from '../current-internship.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { User } from 'src/app/model/User';
import { StudentInternship, StudentInternshipPriority, StudentInternshipStatus, Task } from 'src/app/model/studentInternship.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JournalingTasks } from 'src/app/model/journalingTasks.model';
import { MatDialog } from '@angular/material/dialog';
import { JournalingComponent } from '../journaling/journaling.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NewTaskFormComponent } from '../new-task-form/new-task-form.component';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

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
  journaling: JournalingTasks | undefined;
  mentorComment: string = '';
  messageCount: number = 0; 
  showChat: boolean = false;

  studentName: String = '';
  studentLastName: String = '';
  studentImage: String = '';
  internshipId: number = 0;
  notShow: boolean = false;


  taskStatuses = [
    StudentInternshipStatus.STUCK,
    StudentInternshipStatus.IN_PROGRESS,
    StudentInternshipStatus.NOT_REVIEWED,
    StudentInternshipStatus.DONE
  ];

  priorities = [
    StudentInternshipPriority.LOW,
    StudentInternshipPriority.MEDIUM,
    StudentInternshipPriority.HIGH
  ]

  

  constructor(
    private service: CurrentInternshipService, 
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserProfileService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const idString = params.get('id');
        if (idString !== null) {
          this.internshipId = parseInt(idString);
        }
      });

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
            if(this.internshipId == 1){  
              this.service.getByPsychologistId(1).subscribe({
                next: (studentInternship: StudentInternship) => {
                  this.studentInternship = studentInternship;
                  this.loadStudentInfo("zarkokn@gmail.com");
                }
              });
            }
            else{
              this.service.getByPsychologist2Id(2).subscribe({
                next: (studentInternship: StudentInternship) => {
                  this.studentInternship = studentInternship;
                  this.notShow = true;
                  this.loadStudentInfo("zarkokn@gmail.com");
                }
              });
            }
            this.getMessageCount();
          } else if (this.userRole == 'ROLE_STUDENT') {
            this.service.getByStudentId(2).subscribe({
              next: (studentInternship: StudentInternship) => {
                this.studentInternship = studentInternship;
                this.loadStudentInfo("psiholog@gmail.com");
              }
              
            });
            this.getMessageCount();
          }
        }
      });
    }


  getMessageCount(){
    if (this.userRole == 'ROLE_PSYCHOLOG') {
      this.service.getNumOfUnreadPsychologistMessages(1, 1).subscribe({
        next: (num: number) => {
          this.messageCount = num;
        }
      })
    }
    else{
      this.service.getNumOfUnreadStudentMessages(2, 1).subscribe({
        next: (num: number) => {
          this.messageCount = num;
        }
      })
    }

  }

  getTasksByStatus(status: string): Task[] {
    return this.studentInternship?.tasks.filter(task => task.status === status) || [];
  }

  loadStudentInfo(email: string): void {
    this.userService.getUserByEmail(email).subscribe({
      next: (user: User) => {
        this.studentName = user.name;
        this.studentLastName = user.lastName;
        this.studentImage = user.imageUrl || '';
      }
    });
  }

  getConnectedLists(status: StudentInternshipStatus): string[] {
    if (this.userRole === 'ROLE_STUDENT') {
      if (status === StudentInternshipStatus.DONE) {
        return [];
      } else {
        return this.taskStatuses.filter(s => s !== StudentInternshipStatus.DONE);
      }
    } else if (this.userRole === 'ROLE_PSYCHOLOG') {
      if (status === StudentInternshipStatus.NOT_REVIEWED) {
        return [StudentInternshipStatus.DONE];
      } else {
        return [StudentInternshipStatus.NOT_REVIEWED];
      }
    }
    return this.taskStatuses;
  }
  
  isDraggable(task: Task, status: StudentInternshipStatus): boolean {
    if (this.userRole === 'ROLE_STUDENT' && status === StudentInternshipStatus.DONE) {
      return false;
    }
    if (this.userRole === 'ROLE_PSYCHOLOG' && status !== StudentInternshipStatus.NOT_REVIEWED) {
      return false;
    }
    return true;
  }
  
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const targetStatus = event.container.id as StudentInternshipStatus;
  
      if (this.userRole === 'ROLE_STUDENT') {
        if ([StudentInternshipStatus.IN_PROGRESS, StudentInternshipStatus.STUCK, StudentInternshipStatus.NOT_REVIEWED].includes(targetStatus)) {
          task.status = targetStatus;
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  
          if (targetStatus === StudentInternshipStatus.NOT_REVIEWED) {
            this.openFilePicker(task);
          } else {
            this.service.updateTask(task).subscribe({
              next: () => {
                console.log('Task status updated successfully');
              }
            });
          }
        }
      }
  
      if (this.userRole === 'ROLE_PSYCHOLOG') {
        if (event.previousContainer.id === StudentInternshipStatus.NOT_REVIEWED && targetStatus === StudentInternshipStatus.DONE) {
          task.status = targetStatus;
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  
          this.service.updateTask(task).subscribe({
            next: () => {
              console.log('Task status updated successfully');
            }
          });
        }
      }
    }
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

newTask(): void {
  const dialogRef = this.dialog.open(NewTaskFormComponent, {
    width: '400px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.handleTaskCreated(result);
    }
  });
}

openChat(): void {
  this.showChat = !this.showChat;
 // this.router.navigate(['/chat/']);
}

closeChat() {
  this.showChat = false; // Close the chat
}

handleTaskCreated(task: any) {
  console.log('New Task Created:', task);

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
      this.service.getJournaling(1).subscribe({
        next: (jour: JournalingTasks) => {
          this.journaling = jour;
          this.openDialog(this.journaling);
        }
      });

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


openDialog(journaling: JournalingTasks): void {
  this.dialog.open(JournalingComponent, {
    width: '400px',
    data: journaling
  });
}

submitComment(): void {
  this.service.submitComment(this.mentorComment, this.studentInternship?.id || 0).subscribe({
    next: () => {
      this.dialog.open(NotificationDialogComponent, {
        data: {
          title: 'Success',
          message: 'Comment submitted successfully'
        }
      });
      this.mentorComment = '';
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
    this.service.updateTask(task).subscribe({
      next: () => {
        console.log('Task status updated and PDF uploaded successfully');
      }
    });
  };
  reader.readAsDataURL(file);
}

uploadPdf(task: any): void {
       window.alert('PDF successfully uploaded');
       task.status = StudentInternshipStatus.NOT_REVIEWED;
       task.pdfUrl = null;
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

editTask(task: Task): void {
  task.editable = true;
}

saveTask(task: Task): void {
  task.editable = false;
}


}
