import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalingTasks } from 'src/app/model/journalingTasks.model';
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

  getByPsychologistId(id: number) : Observable<StudentInternship> {
    return this.http.get<StudentInternship>(environment.apiHost + 'student-internships/by-psychologist/' + id);
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
