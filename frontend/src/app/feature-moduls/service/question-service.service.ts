import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:8081/api/questions');
  }

  delete(id: number | undefined, question: Question): Observable<Question> {
    return this.http.post<Question>(
      `http://localhost:8081/api/questions/invisible/${id}`,
      question
    );
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(
      'http://localhost:8081/api/questions',
      question
    );
  }
}
