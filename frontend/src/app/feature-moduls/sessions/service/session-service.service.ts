import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TimeSlot } from '../model/timeSlot.model';
import { GroupSession } from '../model/groupSession.model';
import { Psychologist } from '../model/psychologist.model';
import { IndividualSession } from '../model/individualSession.model';
import { SessionDocumentation } from '../model/sessionDocumentaton.model';
import { DocumentationJournal } from '../model/documentationJournal.model';

@Injectable({
  providedIn: 'root',
})
export class SessionServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getFreeSlots(psychologistId: number, date: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(
      `http://localhost:8081/api/sessions/${psychologistId}/${date}`
    );
  }

  createGroupSession(session: GroupSession): Observable<GroupSession> {
    return this.http.post<GroupSession>(
      'http://localhost:8081/api/groupSessions',
      session
    );
  }

  createIndividualSession(
    session: IndividualSession
  ): Observable<IndividualSession> {
    return this.http.post<IndividualSession>(
      'http://localhost:8081/api/individualSessions',
      session
    );
  }

  getAll(): Observable<GroupSession[]> {
    return this.http.get<GroupSession[]>(
      'http://localhost:8081/api/groupSessions'
    );
  }

  reserveSession(
    session: GroupSession,
    registeredUserId: number
  ): Observable<GroupSession> {
    return this.http.post<GroupSession>(
      `http://localhost:8081/api/groupSessions/${registeredUserId}`,
      session
    );
  }

  getAllPsychologist(): Observable<Psychologist[]> {
    return this.http.get<Psychologist[]>(
      'http://localhost:8081/api/psychologist'
    );
  }

  getIndividualSessionsByPsychologist(
    psychologistId: number
  ): Observable<IndividualSession[]> {
    return this.http.get<IndividualSession[]>(
      `http://localhost:8081/api/individualSessions/getByPsychologist/${psychologistId}`
    );
  }

  createDoc(
    documentation: SessionDocumentation
  ): Observable<SessionDocumentation> {
    return this.http.post<SessionDocumentation>(
      `http://localhost:8081/api/sessionDocumentations`,
      documentation
    );
  }

  generateReport(documentId: number | undefined): Observable<Blob> {
    return this.http.get(
      `http://localhost:8081/api/sessions/pdf/${documentId}`,
      { responseType: 'blob' }
    );
  }

  getAllDocumentations(): Observable<SessionDocumentation[]> {
    return this.http.get<SessionDocumentation[]>(
      'http://localhost:8081/api/sessionDocumentations'
    );
  }

  getAllJournal(): Observable<DocumentationJournal[]> {
    return this.http.get<DocumentationJournal[]>(
      'http://localhost:8081/api/documentationJournal'
    );
  }

  deleteDocumentation(
    documentationId: number | undefined
  ): Observable<SessionDocumentation> {
    return this.http.delete<SessionDocumentation>(
      `http://localhost:8081/api/sessionDocumentations/delete/${documentationId}`
    );
  }

  updateDocumentation(
    doc: SessionDocumentation,
    id: number
  ): Observable<SessionDocumentation> {
    return this.http.put<SessionDocumentation>(
      `http://localhost:8081/api/sessionDocumentations/update/${id}`,
      doc
    );
  }
}
