import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { CurrentInternshipService } from '../current-internship.service';
import { FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  otherName: string = '' ;
  messageControl = new FormControl('');
  userClaims: any = null;
  userRole: string = '';
  @Output() messageSent = new EventEmitter<void>();
    
  constructor( private service: CurrentInternshipService,  private authService: AuthServiceService) {}
  ngOnInit() {
    this.getUserInfo();
    this.getMessages();
  }

  getUserInfo(): void{
    this.authService.loginStatus$.subscribe(loggedIn => {
      if (loggedIn) {
        const token = localStorage.getItem('token');
        this.userClaims = this.authService.decodeToken();
        this.userRole = this.userClaims.role[0].authority;
      } else {
        this.userRole = '';
      }
    });
  }

  getMessages(): void {
    this.service.getMessages(1).subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.messages = messages.filter(message => !!message).sort((a, b) => (a.id || 0) - (b.id || 0));
        if (this.userRole == 'ROLE_PSYCHOLOG') {
            this.messages.forEach(mess => {
              this.otherName = mess.studentName || '';
              if (mess.sender =='student' && mess.read == false) {
                mess.read = true;
                this.service.readMessage(mess).subscribe();
              }
            });
        }
        else if (this.userRole == 'ROLE_STUDENT'){
            this.messages.forEach(mess => {
              
              this.otherName = mess.psychologistName || '';
              if (mess.sender =='psychologist' && mess.read == false) {
                mess.read = true;
                this.service.readMessage(mess).subscribe();
              }
          });
        }
      }
    });
  }

   sendMessage() {
    const message: Message = {
      content: this.messageControl.value || "",
      read: false,
      studentId: 2,
      studentInternshipId: 1,
      psychologistId: 1,
      sender: this.userRole === 'ROLE_PSYCHOLOG' ? 'psychologist' : 'student'
    }

    this.service.addMessage(message).subscribe({
      next: () => {
        this.getMessages();
        this.messageSent.emit();
        this.messageControl.setValue('');
      },
    });
  }
}
