import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../service/session-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { SessionDocumentation } from '../model/sessionDocumentaton.model';
import { DocumentationJournal } from '../model/documentationJournal.model';

@Component({
  selector: 'app-documentation-journal',
  templateUrl: './documentation-journal.component.html',
  styleUrls: ['./documentation-journal.component.css'],
})
export class DocumentationJournalComponent implements OnInit {
  documentations: SessionDocumentation[] | undefined;
  journals: DocumentationJournal[] | undefined;

  constructor(
    private sessionService: SessionServiceService,
    private authService: AuthServiceService
  ) {}
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
}
