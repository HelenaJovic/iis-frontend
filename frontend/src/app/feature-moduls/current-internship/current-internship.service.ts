import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalingTasks } from 'src/app/model/journalingTasks.model';
import { Message } from 'src/app/model/message.model';
import { ReportDto } from 'src/app/model/report.model';
import { StudentInternship, Task } from 'src/app/model/studentInternship.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentInternshipService {

  constructor(private http: HttpClient) { }

  getByStudentId(id: number) : Observable<StudentInternship> {
    return this.http.get<StudentInternship>(environment.apiHost + 'student-internships/by-student/' + id);
  }

  submitComment(comment: String, id: number) : Observable<void>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.put<void>(environment.apiHost + 'student-internships/update-internship/' +id, comment, { headers });
  }

  getByPsychologistId(id: number) : Observable<StudentInternship> {
    return this.http.get<StudentInternship>(environment.apiHost + 'student-internships/by-psychologist/' + id);
  }

  getByPsychologist2Id(id: number) : Observable<StudentInternship> {
    return this.http.get<StudentInternship>(environment.apiHost + 'student-internships/by-psychologist2/' + id);
  }

  getAllByPsychologistId(id: number) : Observable<StudentInternship[]> {
    return this.http.get<StudentInternship[]>(environment.apiHost + 'student-internships/all-by-psychologist/' + id);
  }


  getNumOfUnreadStudentMessages(studentId: number, studentInternshipId: number): Observable<number>{
    return this.http.get<number>(environment.apiHost  + 'student-internships/num-unread-messages-student/' + studentInternshipId + '/' + studentId)
  }

  getNumOfUnreadPsychologistMessages(psychologistId: number, studentInternshipId: number): Observable<number>{
    return this.http.get<number>(environment.apiHost  + 'student-internships/num-unread-messages-psychologist/' + studentInternshipId + '/' + psychologistId)
  }

  getMessages(studentInternshipId: number): Observable<Message[]>{
    return this.http.get<Message[]>(environment.apiHost  + 'student-internships/messages/' + studentInternshipId);
  }

  addMessage(message: Message): Observable<void> {
    return this.http.post<void>(environment.apiHost + 'student-internships/messages', message);
  }

  readMessage(message: Message): Observable<void> {
    return this.http.put<void>(environment.apiHost + 'student-internships/messages/read', message);
  }

  createNewTask(task: Task): Observable<void>{
    return this.http.post<void>(environment.apiHost + 'student-internships', task);
  }

  getJournaling(id: number): Observable<JournalingTasks>{
    return this.http.get<JournalingTasks>(environment.apiHost + 'tasks-journals');
  }
  

  uploadPdf(file: Blob, fileName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, fileName);

    return this.http.post(environment.apiHost + 'student-internships/pdf', formData);
  }

  updateTask(task: Task): Observable<void>{
    return this.http.put<void>(environment.apiHost + 'student-internships', task);
  }

  getFinishedInternshipByStudent(studentId: number): Observable<ReportDto>{
    return this.http.get<ReportDto>(environment.apiHost + 'student-internships/finishedInternship/' + studentId);
  }
}
