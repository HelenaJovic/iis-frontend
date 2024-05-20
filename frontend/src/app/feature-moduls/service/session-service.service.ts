import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TimeSlot } from '../model/timeSlot.model';
import { GroupSession } from '../model/groupSession.model';
import { Psychologist } from '../model/psychologist.model';
import { IndividualSession } from '../model/individualSession.model';

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
}
