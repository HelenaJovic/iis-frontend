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
import { Router } from '@angular/router';
import { SessionDescriptionDialogComponent } from '../session-description-dialog/session-description-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionHistoryComponent } from '../session-history/session-history.component';

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
  currentIndex = 0;

  documentationForm = new FormGroup({
    topicSummary: new FormControl(''),
    emotionalReactions: new FormControl(''),
    plans: new FormControl(''),
  });

  constructor(
    private sessionService: SessionServiceService,
    private authService: AuthServiceService,
    private userService: UserProfileService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = parseInt(this.authService.getUserId());

    this.sessionService
      .getIndividualSessionsByPsychologist(this.loggedInUserId)
      .subscribe({
        next: (result) => {
          this.Sessions = result;
          result.forEach((session) => {
            console.log(
              `Start Time: ${session.startTime}, End Time: ${session.endTime}`
            );
          });
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

  GenerateReport() {
    this.sessionService
      .generateReport(this.savedDoc!.id)
      .subscribe((response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `session_report_${this.savedDoc!.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

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

  viewJournal() {
    this.router.navigate(['/documentation-journal']);
  }

  getNextName(): string {
    const names = ['Mila Maksimovic', 'Ana Boskovic'];
    if (this.currentIndex >= names.length) {
      this.currentIndex = 0;
    }
    return names[this.currentIndex++];
  }

  sessionHistory() {
    this.dialog.open(SessionHistoryComponent, {
      width: '900px',
    });
  }
}
