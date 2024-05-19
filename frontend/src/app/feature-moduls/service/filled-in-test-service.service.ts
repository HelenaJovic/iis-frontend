import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FilledInTest } from '../model/filledInTest.model';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer.model';
import { TestResults } from '../model/testResults.model';

@Injectable({
  providedIn: 'root',
})
export class FilledInTestServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  createTest(test: FilledInTest): Observable<FilledInTest> {
    return this.http.post<FilledInTest>(
      `http://localhost:8081/api/filledInTests`,
      test
    );
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>('http://localhost:8081/api/answers', answer);
  }

  finishTest(
    id: number | undefined,
    test: FilledInTest | undefined
  ): Observable<FilledInTest> {
    return this.http.post<FilledInTest>(
      `http://localhost:8081/api/filledInTests/finishTest/${id}`,
      test
    );
  }

  calculate(userId: number | undefined): Observable<TestResults> {
    return this.http.get<TestResults>(
      `http://localhost:8081/api/filledInTests/results/${userId}`
    );
  }

  getAllFinished(): Observable<FilledInTest[]> {
    return this.http.get<FilledInTest[]>(
      `http://localhost:8081/api/filledInTests/allFinished`
    );
  }
}
