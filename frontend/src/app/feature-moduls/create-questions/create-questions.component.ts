import { Component, OnInit } from '@angular/core';
import { Question, questionCategory } from '../model/question.model';
import { QuestionServiceService } from '../service/question-service.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css'],
})
export class CreateQuestionsComponent implements OnInit {
  constructor(
    private questionService: QuestionServiceService,
    private authService: AuthServiceService
  ) {}

  questions: Question[] = [];
  loggedInUserId: number = 0;
  questionTypes = Object.values(questionCategory);

  questionForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    questionType: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe({
      next: (result) => {
        console.log(result);
        this.questions = result.filter((result) => result.visible);
      },
    });
  }

  delete(id: number | undefined, question: Question) {
    this.questionService.delete(id, question).subscribe({
      next: () => {
        this.questions = this.questions.filter((q) => q.id !== question.id);
      },
    });
  }

  finish() {
    if (this.questions.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Questions',
        text: 'You have to create at least 10 questions.',
      });
    }
  }

  createQuestion() {
    this.loggedInUserId = parseInt(this.authService.getUserId());
    console.log(this.loggedInUserId);
    const question: Question = {
      text: this.questionForm.value.text || '',
      visible: true,
      category: this.questionForm.value.questionType as questionCategory,
      psychologistId: this.loggedInUserId,
    };

    if (this.questions.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Questions',
        text: 'You can create a maximum of 30 questions. If you want to add a new one, you first need to delete one of the existing ones.',
      });
      this.questionForm.reset();
    } else {
      this.questionService.createQuestion(question).subscribe({
        next: (result) => {
          console.log(result);
          this.questionForm.reset();
          this.showCreatedQuestion(result);
        },
      });
    }
  }

  showCreatedQuestion(question: Question) {
    this.questions.push(question);
  }
}
