import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Workshop } from 'src/app/model/workshop.model';
import { User } from '../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  constructor(private http: HttpClient) {}


  getUserByEmail(email: string): Observable<User> {
    console.log("Email je "+email);
    return this.http.get<User>(environment.apiHost + 'users/email/' + email);
}

getAllWorkshops(id: number): Observable<Workshop[]> {
    console.log("id je "+id);
    return this.http.get<Workshop[]>(environment.apiHost + 'workshops/workshops/' + id);
}
getAllUsers(workshopId: number): Observable<RegisteredUser[]> {
  console.log("id je "+workshopId);
  return this.http.get<RegisteredUser[]>(environment.apiHost + `registeredUser/${workshopId}/users`);
}



//   getUserByEmail(email: string): Observable<User> {
//     console.log("Email je "+email);
//     return this.http.get<User>(environment.apiHost + 'users/email/' + email);
// }

// updateProfile(user: User, id: number): Observable<User> {
//     // Formatiranje URL-a sa stvarnom vrednošću ID-ja korisnika
//     const url = `http://localhost:8081/api/users/update/${id}`;
    
//     // Poziv HTTP PUT metode na backend sa podacima korisnika i ID-om
//     return this.http.put<User>(url, user);
//   }
  

}