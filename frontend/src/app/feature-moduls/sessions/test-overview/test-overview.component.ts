import { Component, OnInit } from '@angular/core';
import { FilledInTest } from '../model/filledInTest.model';
import { QuestionServiceService } from '../service/question-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { FilledInTestServiceService } from '../service/filled-in-test-service.service';
import { Question } from '../model/question.model';
import { Answer } from '../model/answer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-overview',
  templateUrl: './test-overview.component.html',
  styleUrls: ['./test-overview.component.css'],
})
export class TestOverviewComponent implements OnInit {
  loggedInUserId: number = 0;
  createdTest: FilledInTest | undefined;
  questions: Question[] = [];
  selectedCircle: number | null = null;
  selectedQuestionId: number = 0;
  counter: number = 0;

  constructor(
    private filledInTestService: FilledInTestServiceService,
    private questionService: QuestionServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  startTest() {
    this.loggedInUserId = parseInt(this.authService.getUserId());
    const today = new Date();
    const test: FilledInTest = {
      finishedDate: today,
      registeredUserId: this.loggedInUserId,
      isFinished: false,
    };

    this.filledInTestService.createTest(test).subscribe({
      next: (result) => {
        this.createdTest = result;
        console.log(this.createdTest);
      },
    });
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (result) => {
        this.questions = result.filter((result) => result.visible);
      },
    });
  }

  createAnswer(
    questionId: number | undefined,
    points: number,
    event: MouseEvent
  ) {
    if (this.createdTest == undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Test',
        text: 'You must press Start Test!',
      });
      return;
    }
    var circleElement = event.target as HTMLDivElement;
    circleElement.style.color = 'rgb(46, 127, 220)';
    var parentDiv = circleElement.parentElement!;
    parentDiv.style.pointerEvents = 'none';

    this.selectedCircle = points;
    const answer: Answer = {
      points: points,
      questionId: questionId!,
      filledInTestId: this.createdTest!.id!,
    };

    this.filledInTestService.createAnswer(answer).subscribe({
      next: (result) => {
        this.counter += 1;
      },
    });
  }

  endTest() {
    if (this.counter != this.questions.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Test',
        text: 'You have to fill out all questions before finishing the test.',
      });
      return;
    }

    this.filledInTestService
      .finishTest(this.createdTest!.id, this.createdTest)
      .subscribe({
        next: (result) => {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Test filled',
            text: 'You have successfully filled the test.',
          });
        },
      });
  }
}
