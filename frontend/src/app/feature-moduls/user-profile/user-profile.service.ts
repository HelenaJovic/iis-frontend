import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from '../sessions/model/User';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    console.log('Email je ' + email);
    return this.http.get<User>(environment.apiHost + 'users/email/' + email);
  }

  updateProfile(user: User, id: number): Observable<User> {
    // Formatiranje URL-a sa stvarnom vrednošću ID-ja korisnika
    const url = `http://localhost:8081/api/users/update/${id}`;

    // Poziv HTTP PUT metode na backend sa podacima korisnika i ID-om
    return this.http.put<User>(url, user);
  }

  getById(id: number | undefined): Observable<User> {
    return this.http.get<User>(environment.apiHost + 'users/' + id);
  }
}
