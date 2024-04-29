import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
})
export class TestResultsComponent implements OnInit {
  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart() {
    new Chart('pieChart', {
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
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
