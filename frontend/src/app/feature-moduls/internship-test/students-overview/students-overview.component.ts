import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { InternshipTestService } from '../internship-test.service';
import { Student } from 'src/app/model/student.model';
import { InternshipTest } from 'src/app/model/internship.model';
import { HallDto } from 'src/app/model/hall.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/busy-hall-dialog.component';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { TestReccomend } from 'src/app/model/test-reccomend.model';

@Component({
  selector: 'app-students-overview',
  templateUrl: './students-overview.component.html',
  styleUrls: ['./students-overview.component.css']
})
export class StudentsOverviewComponent implements OnInit {
  students: Student[] = [];
  pagedStudents: Student[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  internshipTest: InternshipTest | undefined;
  title: string = '';
  halls: HallDto[] = [];
  selectedTime: string = '';
  selectedHalls: HallDto[] = [];
  intershipId: number = 0;
  isDefined: boolean = false;
  duration: number = 0;
  testRecommendations: TestReccomend[] = [
    { hall: { id: 1, name: 'Hall A', capacity: 50 }, time: '08:00h' },
    { hall: { id: 2, name: 'Hall B', capacity: 40 }, time: '10:00h' },
    { hall: { id: 3, name: 'Hall 101', capacity: 30 }, time: '12:00h' },
    { hall: { id: 4, name: 'Lab 203', capacity: 20 }, time: '14:00h' },
    { hall: { id: 1, name: 'Hall A', capacity: 50 }, time: '16:00h' },
    { hall: { id: 2, name: 'Hall B', capacity: 40 }, time: '18:00h' },
    { hall: { id: 3, name: 'Lab 203', capacity: 30 }, time: '20:00h' }
  ];
  filteredRecommendations: TestReccomend[] = [];
  selectedPeriod: string = '';
  selectedHallForFilter: HallDto | undefined;

  constructor(public dialog: MatDialog, private service: InternshipTestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString !== null) {
        this.intershipId = parseInt(idString);
      }
    });
    this.getInternshipTest();
    this.getHalls();
  }

  getInternshipTest(): void {
    this.service.getInternshipTest(this.intershipId).subscribe({
      next: (internshipTest: InternshipTest) => {
        if (internshipTest.time != null) {
          this.isDefined = true;
        }
        this.title = internshipTest.internshipTitle;
        this.internshipTest = internshipTest;

        this.service.getStudentsByInternshipTest(internshipTest.id || 0).subscribe({
          next: (students: Student[]) => {
            this.students = students;
            this.totalPages = Math.ceil(this.students.length / this.pageSize);
            this.updatePagedStudents();
          }
        });
      }
    });
  }

  getHalls(): void {
    this.service.getAllHalls().subscribe({
      next: (halls: HallDto[]) => {
        this.halls = halls;
      }
    });
  }

  updatePagedStudents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedStudents = this.students.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedStudents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedStudents();
    }
  }

  onTimeSelected(value: string): void {
    this.selectedTime = value;
  }

  done(): void {
    if (this.internshipTest) {
      this.internshipTest.hall = this.selectedHalls[0];
      this.internshipTest.time = this.selectedTime;
      this.internshipTest.duration = this.duration;
    }
    this.service.updateTest(this.internshipTest).subscribe({
      next: () => {
        this.router.navigate(['/internship-overview']);
      },
      error: (error) => {
        this.openErrorDialog('This hall is reserved in this time, try another date or hall');
      }
    });
  }
  
  request(): void {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '400px',
      data: { studentsCount: this.students.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle request action
        console.log('Request confirmed');
      } else {
        // Handle cancel action
        console.log('Request cancelled');
      }
    });
  }


  openErrorDialog(errorMessage: string): void {
    this.dialog.open(InfoDialogComponent, {
      width: '250px',
      data: errorMessage
    });
  }

  findRecommendations(): void {
    let filtered = this.testRecommendations;

    if (this.selectedHallForFilter) {
      filtered = filtered.filter(rec => rec.hall.id === this.selectedHallForFilter?.id);
    }

    if (this.selectedPeriod) {
      const periodTimes: { [key in 'morning' | 'noon' | 'afternoon']: string[] } = {
        morning: ['08:00h', '10:00h'],
        noon: ['12:00h', '14:00h'],
        afternoon: ['16:00h', '18:00h', '20:00h']
      };
      filtered = filtered.filter(rec => periodTimes[this.selectedPeriod as keyof typeof periodTimes].includes(rec.time));
    }

    this.filteredRecommendations = filtered.slice(0, 3);
  }

}


