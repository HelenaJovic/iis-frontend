import { Component, OnInit } from '@angular/core';
import { InternshipTestService } from '../internship-test.service';
import { InternshipTest } from 'src/app/model/internship.model';
import { Router } from '@angular/router';

interface ExtendedInternshipTest extends InternshipTest {
  numOfStudents?: number;
  avaragePointsNum?: number;
}

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements OnInit {
  tests: ExtendedInternshipTest[] = [];
  pagedTests: ExtendedInternshipTest[] = [];
  pageSize: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private service: InternshipTestService, private router: Router) {}

  ngOnInit(): void {
    this.getTests();
  }

  getTests(): void {
    this.service.getAllInternshipTests().subscribe({
      next: (tests: ExtendedInternshipTest[]) => {
        tests.forEach(test => {
          test.numOfStudents = Math.floor(Math.random() * 30) + 1; 
          test.avaragePointsNum = Math.floor(Math.random() * 100) + 1;
        });
        tests[0].numOfStudents = 7;
        this.tests = tests.sort((a, b) => {
          if (a.testReviewed === b.testReviewed) {
            return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort by date descending
          } else if (a.testReviewed && !b.testReviewed) {
            return 1;
          } else {
            return -1;
          }
        });

        this.totalPages = Math.ceil(this.tests.length / this.pageSize);
        this.updatePagedTests();
      }
    });
  }

  updatePagedTests(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedTests = this.tests.slice(startIndex, endIndex);
  }

  sortTestsByDate(order: 'asc' | 'desc'): void {
    this.tests.sort((a, b) => {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      return order === 'asc' ? dateComparison : -dateComparison;
    });
    this.updatePagedTests();
  }

  sortTestsByPopularity(): void {
    this.tests.sort((a, b) => b.numOfStudents! - a.numOfStudents!);
    this.updatePagedTests();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedTests();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedTests();
    }
  }

  handleClick(test: ExtendedInternshipTest): void {
    this.router.navigate(['/test-results/' + test.id]);
  }
}
