import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../service/session-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { IndividualSession } from '../model/individualSession.model';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionDocumentation } from '../model/sessionDocumentaton.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.css'],
})
export class SessionOverviewComponent implements OnInit {
  loggedInUserId: number | undefined;
  Sessions: IndividualSession[] | undefined;
  individualSessionId: number | undefined;
  displayForm: boolean | undefined = false;
  savedDoc: SessionDocumentation | undefined;

  documentationForm = new FormGroup({
    topicSummary: new FormControl('', [Validators.required]),
    emotionalReactions: new FormControl('', [Validators.required]),
    plans: new FormControl('', [Validators.required]),
  });

  constructor(
    private sessionService: SessionServiceService,
    private authService: AuthServiceService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = parseInt(this.authService.getUserId());

    this.sessionService
      .getIndividualSessionsByPsychologist(this.loggedInUserId)
      .subscribe({
        next: (result) => {
          this.Sessions = result;
          console.log(result);
        },
      });
  }

  getUser(userId: number): Observable<User> {
    return this.userService.getById(userId);
  }

  StartSession(id: number | undefined) {
    this.individualSessionId = id;
    console.log(this.individualSessionId);
    this.displayForm = true;
  }

  GenerateReport() {}

  CreateDoc() {
    const doc: SessionDocumentation = {
      topicSummary: this.documentationForm.value.topicSummary || '',
      emotionalReactions: this.documentationForm.value.emotionalReactions || '',
      plan: this.documentationForm.value.plans || '',
      individualSessionId: this.individualSessionId!,
    };

    this.sessionService.createDoc(doc).subscribe({
      next: (result) => {
        this.savedDoc = result;
        console.log(this.savedDoc);
        this.documentationForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Documentation created',
          text: 'You have successfully created session documentation.',
        });
      },
    });
  }
}
