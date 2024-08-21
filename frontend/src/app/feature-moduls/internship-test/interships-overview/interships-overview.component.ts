import { Component, OnInit } from '@angular/core';
import { InternshipDto, InternshipTest } from 'src/app/model/internship.model';
import { InternshipTestService } from '../internship-test.service';
import { Router } from '@angular/router';

interface ExtendedInternship extends InternshipDto {
  time?: string | null;
}

@Component({
  selector: 'app-interships-overview',
  templateUrl: './interships-overview.component.html',
  styleUrls: ['./interships-overview.component.css']
})
export class IntershipsOverviewComponent implements OnInit {
  internships: ExtendedInternship[] = [];
  filteredInternships: ExtendedInternship[] = [];
  searchQuery: string = '';
  isDefined: boolean = false;
  sortCriteria: string = '';

  constructor(private service: InternshipTestService, private router: Router) {}

  ngOnInit(): void {
    this.getInternships();
  }

  getInternships(): void {
    this.service.getAllInternships().subscribe({
      next: (internships: ExtendedInternship[]) => {
        this.internships = internships;
        this.updateInternshipTimes();
        this.filterInternships();
        console.log(this.internships.length);
      }
    });
  }

  filterInternships(): void {
    this.filteredInternships = this.internships.filter(internship =>
      internship.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.sortInternships();
  }  

  updateInternshipTimes(): void {
    this.internships.forEach(internship => {
      this.service.getInternshipTest(internship.id).subscribe({
        next: (internshipTest: InternshipTest) => {
          internship.time = internshipTest.time;
          this.filterInternships(); // Osigurajte da se filtriranje ponovo izvrši nakon ažuriranja
        }
      });
    });
  }

  onCardClicked(id: number): void {
    this.router.navigate(['/internship-details/' + id]);
  }

  setSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortInternships();
  }

  sortInternships(): void {
    if (this.sortCriteria === 'dateAsc') {
      this.filteredInternships.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortCriteria === 'dateDesc') {
      this.filteredInternships.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortCriteria === 'timeDefined') {
      this.filteredInternships.sort((a, b) => {
        if (a.time === null && b.time !== null) return 1;
        if (a.time !== null && b.time === null) return -1;
        return 0;
      });
    } else {
      this.filteredInternships.sort((a, b) => {
        if (a.time === null && b.time !== null) return -1;
        if (a.time !== null && b.time === null) return 1;
        return 0;
      });
    }
  }
}
