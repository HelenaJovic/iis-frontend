import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipTestService } from '../internship-test.service';
import { InternshipTest } from 'src/app/model/internship.model';
import { StudentTest } from 'src/app/model/studentTest.model';
import { MatDialog } from '@angular/material/dialog';
import { BestStudentsDialogComponent } from '../best-students-dialog/best-students-dialog.component';

interface ExtendedStudentTest extends StudentTest {
  showInput?: boolean;
}

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  internshipTestId: number = 0;
  internshipTest: InternshipTest | undefined;
  allStudentTests: ExtendedStudentTest[] = [];
  reviewedStudentTests: ExtendedStudentTest[] = [];
  notReviewedStudentTests: ExtendedStudentTest[] = [];
  currentNotReviewedPage: number = 0;
  notReviewedPageSize: number = 4;
  pagedNotReviewedStudentTests: ExtendedStudentTest[] = [];
  currentReviewedPage: number = 0;
  reviewedPageSize: number = 2;
  pagedReviewedStudentTests: ExtendedStudentTest[] = [];
  notReviewedSearchTerm: string = '';
  reviewedSearchTerm: string = '';
  anyChanges: boolean = false; // Define anyChanges property

  constructor(private route: ActivatedRoute, private router: Router, private service: InternshipTestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString !== null) {
        this.internshipTestId = parseInt(idString);
      }
    });
    this.getInternshipTest();
    this.getStudentTests();
  }

  getInternshipTest(): void {
    this.service.getInternshipTest(this.internshipTestId).subscribe({
      next: (test: InternshipTest) => {
        this.internshipTest = test;
      }
    });
  }

  getStudentTests(): void {
    this.service.getStudentTestsByInternshipTest(this.internshipTestId).subscribe({
      next: (studentTests: ExtendedStudentTest[]) => {
        this.allStudentTests = studentTests;
        this.allStudentTests.forEach(st => {
          st.showInput = false
        });
        this.allStudentTests.forEach(test => {
          if (test.reviewed) {
            this.reviewedStudentTests.push(test);
          } else {
            this.notReviewedStudentTests.push(test);
          }
        });
        if (this.notReviewedStudentTests.length == 0) {
          this.service.getBestStudents(this.internshipTestId).subscribe({
            next: (students: StudentTest[]) => {
              this.openDialogForBestStudents(students);
            }
          })
        }
        this.updatePagedNotReviewedStudentTests();
        this.updatePagedReviewedStudentTests();
      }
    });
  }

  openDialogForBestStudents(students: StudentTest[]): void {
    this.dialog.open(BestStudentsDialogComponent, {
      width: '500px',
      data: students
    });

    this.router.navigate(['/test-history']);
  }

  showInputPoints(testid: number): void {
    const test = this.notReviewedStudentTests.find(test => test.id === testid);
    if (test) {
      test.showInput = !test.showInput;
      this.anyChanges = true; // Update anyChanges property
    }
  }

  done(): void {
    this.notReviewedStudentTests.forEach(st => {
      if (st.showInput) {
        this.service.updateStudentTest(st).subscribe({
          next: () => {
            this.notReviewedStudentTests = [];
            this.reviewedStudentTests = [];
            this.anyChanges = false; // Update anyChanges property
            this.getStudentTests();
          }
        });
      }
    });
  }

  updatePagedNotReviewedStudentTests(): void {
    const startIndex = this.currentNotReviewedPage * this.notReviewedPageSize;
    this.pagedNotReviewedStudentTests = this.notReviewedStudentTests.slice(startIndex, startIndex + this.notReviewedPageSize);
  }

  updatePagedReviewedStudentTests(): void {
    const startIndex = this.currentReviewedPage * this.reviewedPageSize;
    this.pagedReviewedStudentTests = this.reviewedStudentTests.slice(startIndex, startIndex + this.reviewedPageSize);
  }

  previousNotReviewedPage(): void {
    if (this.currentNotReviewedPage > 0) {
      this.currentNotReviewedPage--;
      this.updatePagedNotReviewedStudentTests();
    }
  }

  nextNotReviewedPage(): void {
    if (this.currentNotReviewedPage < Math.ceil(this.notReviewedStudentTests.length / this.notReviewedPageSize) - 1) {
      this.currentNotReviewedPage++;
      this.updatePagedNotReviewedStudentTests();
    }
  }

  previousReviewedPage(): void {
    if (this.currentReviewedPage > 0) {
      this.currentReviewedPage--;
      this.updatePagedReviewedStudentTests();
    }
  }

  nextReviewedPage(): void {
    if (this.currentReviewedPage < Math.ceil(this.reviewedStudentTests.length / this.reviewedPageSize) - 1) {
      this.currentReviewedPage++;
      this.updatePagedReviewedStudentTests();
    }
  }

  searchNotReviewedStudents(): void {
    if (this.notReviewedSearchTerm.trim() === '') {
      this.updatePagedNotReviewedStudentTests();
    } else {
      const filteredStudents = this.notReviewedStudentTests.filter(student =>
        student.studentName.toLowerCase().includes(this.notReviewedSearchTerm.toLowerCase()) ||
        student.studentLastName.toLowerCase().includes(this.notReviewedSearchTerm.toLowerCase())
      );
      this.pagedNotReviewedStudentTests = filteredStudents.slice(0, this.notReviewedPageSize);
    }
  }

  searchReviewedStudents(): void {
    if (this.reviewedSearchTerm.trim() === '') {
      this.updatePagedReviewedStudentTests();
    } else {
      const filteredStudents = this.reviewedStudentTests.filter(student =>
        student.studentName.toLowerCase().includes(this.reviewedSearchTerm.toLowerCase()) ||
        student.studentLastName.toLowerCase().includes(this.reviewedSearchTerm.toLowerCase())
      );
      this.pagedReviewedStudentTests = filteredStudents.slice(0, this.reviewedPageSize);
    }
  }

}
