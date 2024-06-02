import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../service/session-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { SessionDocumentation } from '../model/sessionDocumentaton.model';
import { DocumentationJournal } from '../model/documentationJournal.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-documentation-journal',
  templateUrl: './documentation-journal.component.html',
  styleUrls: ['./documentation-journal.component.css'],
})
export class DocumentationJournalComponent implements OnInit {
  documentations: SessionDocumentation[] | undefined;
  journals: DocumentationJournal[] | undefined;
  show: boolean = false;
  docId: number | undefined;
  individualSessionId: number | undefined;

  constructor(
    private sessionService: SessionServiceService,
    private authService: AuthServiceService
  ) {}

  docForm = new FormGroup({
    emotionalReactions: new FormControl('', [Validators.required]),
    topicSummary: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.sessionService.getAllDocumentations().subscribe({
      next: (result) => {
        this.documentations = result;
      },
    });

    this.sessionService.getAllJournal().subscribe({
      next: (result) => {
        this.journals = result;
      },
    });
  }

  delete(documentationId: number | undefined) {
    this.sessionService.deleteDocumentation(documentationId).subscribe({
      next: (result) => {
        this.documentations = this.documentations!.filter(
          (doc) => doc.id !== documentationId
        );
        this.sessionService.getAllJournal().subscribe({
          next: (result) => {
            this.journals = result;
          },
        });
      },
    });
  }

  update(doc: SessionDocumentation) {
    this.show = true;
    this.docForm.patchValue({
      emotionalReactions: doc.emotionalReactions,
      topicSummary: doc.topicSummary,
      plan: doc.plan,
    });
    this.docId = doc.id;
    this.individualSessionId = doc.individualSessionId;
  }

  save() {
    const doc: SessionDocumentation = {
      plan: this.docForm.value.plan || '',
      id: this.docId,
      topicSummary: this.docForm.value.topicSummary || '',
      emotionalReactions: this.docForm.value.emotionalReactions || '',
      individualSessionId: this.individualSessionId!,
    };

    this.sessionService.updateDocumentation(doc, doc.id!).subscribe({
      next: (result) => {
        this.sessionService.getAllDocumentations().subscribe({
          next: (result) => {
            this.documentations = result;
          },
        });

        this.sessionService.getAllJournal().subscribe({
          next: (result) => {
            this.journals = result;
          },
        });

        this.show = false;
      },
    });
  }
}
