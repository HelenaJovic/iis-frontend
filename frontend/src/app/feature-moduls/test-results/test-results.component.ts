import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { Chart, registerables } from 'node_modules/chart.js';
import { FilledInTestServiceService } from '../service/filled-in-test-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
})
export class TestResultsComponent implements OnInit {
  loggedInUserId: number = 0;

  ngOnInit(): void {
    this.RenderChart();
    this.calculateResult();
  }

  constructor(
    private filledInTestService: FilledInTestServiceService,
    private authService: AuthServiceService
  ) {}

  RenderChart() {
    new Chart('Chart', {
      type: 'bar',
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
            data: [0.9, 0.66, 0.77, 0.44, 0.8],
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

  calculateResult() {
    this.loggedInUserId = parseInt(this.authService.getUserId());

    this.filledInTestService.calculate(this.loggedInUserId).subscribe({
      next: (result) => {
        console.log(result);
      },
    });
  }
}
