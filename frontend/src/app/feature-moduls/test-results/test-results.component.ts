import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { Chart, FillTarget, registerables } from 'node_modules/chart.js';
import { FilledInTestServiceService } from '../service/filled-in-test-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { TestResults } from '../model/testResults.model';
import { User } from '../model/User';
import { UserProfileService } from '../user-profile/user-profile.service';
import { FilledInTest } from '../model/filledInTest.model';
Chart.register(...registerables);

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
})
export class TestResultsComponent implements OnInit {
  loggedInUserId: number = 0;
  testResult: TestResults | undefined;
  mainCharacteristic: number = 0;
  users: User[] = [];
  tests: FilledInTest[] = [];

  ngOnInit(): void {
    this.filledInTestService.getAllFinished().subscribe({
      next: (result) => {
        this.tests = result;
        for (let i = 0; i < this.tests.length; i++) {
          const filledInTest = this.tests[i];
          this.calculateResult(filledInTest.registeredUserId);

          this.userService.getById(filledInTest.registeredUserId).subscribe({
            next: (result) => {
              this.users.push(result);
            },
          });
        }
      },
    });
  }

  constructor(
    private filledInTestService: FilledInTestServiceService,
    private authService: AuthServiceService,
    private userService: UserProfileService
  ) {}

  RenderChart(userId: number | undefined) {
    new Chart('Chart-' + userId, {
      type: 'pie',
      data: {
        labels: [
          'Openness',
          'Conscietiousness',
          'Extraversion',
          'Agreeableness',
          'Neuroticism',
        ],
        datasets: [
          {
            label: '# of Points',
            data: [
              this.testResult?.OpennesPoints,
              this.testResult?.ConscietiousnessPoints,
              this.testResult?.ExtraversionPoints,
              this.testResult?.AgreeablenessPoints,
              this.testResult?.NeuroticismPoints,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  calculateResult(userId: number | undefined) {
    this.loggedInUserId = parseInt(this.authService.getUserId());

    this.filledInTestService.calculate(userId).subscribe({
      next: (result) => {
        this.testResult = result;

        console.log(result);
        this.RenderChart(userId);
      },
    });
  }
}
