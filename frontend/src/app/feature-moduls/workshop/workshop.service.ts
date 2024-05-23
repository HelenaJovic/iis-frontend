import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Workshop } from 'src/app/model/workshop.model';
import { User } from '../model/User';
import { RegisteredUser } from 'src/app/model/registeredUser.model';
import { Hall } from 'src/app/model/hall.model';
import { Psychologist } from 'src/app/model/psychologist.model';
import { WorkshopTest } from 'src/app/model/workshopTest.model';
import { WorkshopQuestion } from 'src/app/model/workshopQuestion.model';
import { WorkshopAnswer } from 'src/app/model/workshopAnswer.model';
import { TestResultDto } from 'src/app/model/testResult.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  constructor(private http: HttpClient) {}


  getUserByEmail(email: string): Observable<User> {
    console.log("Email je "+email);
    return this.http.get<User>(environment.apiHost + 'users/email/' + email);
}

getTestResultByUser(userId: number):Observable<TestResultDto> {
  return this.http.get<TestResultDto>(environment.apiHost + 'test_results/user/' + userId);
}

getTestResultByWorkshop(workshopId: number):Observable<TestResultDto[]> {
  return this.http.get<TestResultDto[]>(environment.apiHost + 'test_results/resultsByWorkshopId/' + workshopId);
}

evaluateTest(testId: number, userId: number, answers: any[]): Observable<TestResultDto> {
  return this.http.post<TestResultDto>(environment.apiHost+`test_results/evaluate/${testId}/${userId}`, answers);
}


getTestByWorkshop(id: number): Observable<WorkshopTest> {
  return this.http.get<WorkshopTest>(environment.apiHost + 'workshop_tests/' + id);
}

createWorkshop(workshop: Workshop): Observable<Workshop> {
  console.log("ne ide")
  return this.http.post<Workshop>(environment.apiHost + 'workshops/create', workshop);
}

createTest(test: WorkshopTest): Observable<WorkshopTest> {
  return this.http.post<WorkshopTest>(environment.apiHost + 'workshop_tests/create', test);
}

createQuestion(question: WorkshopQuestion): Observable<WorkshopQuestion> {
  return this.http.post<WorkshopQuestion>(environment.apiHost + 'test_questions/create', question);
}

createAnswer(answer: WorkshopAnswer): Observable<WorkshopAnswer> {
  return this.http.post<WorkshopAnswer>(environment.apiHost + 'test_answers/create', answer);
}

getAllWorkshops(id: number): Observable<Workshop[]> {
    console.log("id je "+id);
    return this.http.get<Workshop[]>(environment.apiHost + 'workshops/workshops/' + id);
}

getPastWorkshops(id: number): Observable<Workshop[]> {
  console.log("id je "+id);
  return this.http.get<Workshop[]>(environment.apiHost + `workshops/${id}/past-workshops`);
}

getFutureWorkshops(id: number): Observable<Workshop[]> {
  console.log("id je "+id);
  return this.http.get<Workshop[]>(environment.apiHost + `workshops/${id}/future-workshops`);
}

getWorkshopById(id: number): Observable<Workshop> {
  return this.http.get<Workshop>(environment.apiHost + 'workshops/one/' + id);
}
getWorkshops():Observable<Workshop[]> {
  return this.http.get<Workshop[]>(environment.apiHost + 'workshops');
}
getPsycholog(id: number): Observable<Psychologist> {
  return this.http.get<Psychologist>(environment.apiHost + `workshops/psychologist/${id}`);
}

addUserToWorkshop(workshopId: number, userId: number): Observable<string> {
  const params = new HttpParams()
    .set('workshopId', workshopId.toString())
    .set('userId', userId.toString());

  return this.http.post<string>(environment.apiHost+ `userWorkshops/add`, params);
}


getAllHalls(): Observable<Hall[]> {
  return this.http.get<Hall[]>(environment.apiHost + 'halls');
}

getAllUsers(workshopId: number): Observable<RegisteredUser[]> {
  console.log("id je "+workshopId);
  return this.http.get<RegisteredUser[]>(environment.apiHost + `registeredUser/${workshopId}/users`);
}

updateWorkshop(workshop: Workshop, id: number): Observable<Workshop> {
  const url = `http://localhost:8081/api/workshops/${id}`;
  
  return this.http.put<Workshop>(url, workshop);
}

cancelWorkshop(id: number): Observable<Workshop> {
  const url = `http://localhost:8081/api/userWorkshops/cancel/${id}`;
  
  return this.http.put<Workshop>(url,{});
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