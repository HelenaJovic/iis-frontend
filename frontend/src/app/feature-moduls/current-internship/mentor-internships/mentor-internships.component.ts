import { Component, OnInit } from '@angular/core';
import { StudentInternship, StudentInternshipStatus } from 'src/app/model/studentInternship.model';
import { CurrentInternshipService } from '../current-internship.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { ReportDto } from 'src/app/model/report.model';
import jsPDF from 'jspdf';

interface ExtendedStudentInternship extends StudentInternship {
  studentName?: String;
  studentLastName?: String;
  endDate?: Date;
}

@Component({
  selector: 'app-mentor-internships',
  templateUrl: './mentor-internships.component.html',
  styleUrls: ['./mentor-internships.component.css']
})
export class MentorInternshipsComponent implements OnInit {
  mentorStudentInternships: ExtendedStudentInternship[] = [];
  studentInternship!: ReportDto;

  constructor(
    private service: CurrentInternshipService,
    private userService: UserProfileService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.service.getAllByPsychologistId(1).subscribe({
      next: (studentInternships: ExtendedStudentInternship[]) => {
        this.mentorStudentInternships = studentInternships;
        this.mentorStudentInternships.forEach(internship => {
          if (internship.studentId === 2) {
            this.userService.getUserByEmail('zarkokn@gmail.com').subscribe({
              next: (user: User) => {
                internship.studentName = user.name;
                internship.studentLastName = user.lastName;
                internship.endDate = new Date(2024, 7, 5);
              }
            });
          } else {
            this.userService.getUserByEmail('student2@gmail.com').subscribe({
              next: (user: User) => {
                internship.studentName = user.name;
                internship.studentLastName = user.lastName;
                internship.endDate = new Date(2024, 5, 5);
              }
            });
          }
        });
      }
    });
  }

  getInProgressTasks(internship: ExtendedStudentInternship): number {
    return internship.tasks.filter(task => task.status === 'NOT_REVIEWED').length;
  }

  getDaysLeft(endDate: Date | undefined): string {
    if (!endDate) {
      return "0";
    }
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft < 0 ? "ENDED" : daysLeft.toString();
  }
  
  isHighlightRed(internship: ExtendedStudentInternship): boolean {
    const inProgressTasks = this.getInProgressTasks(internship);
    const today = new Date();
    const endDate = internship.endDate ? new Date(internship.endDate) : today;
    return inProgressTasks > 0 && endDate < today;
  }

  shouldShowReportButton(internship: ExtendedStudentInternship): boolean {
    const today = new Date();
    const endDate = internship.endDate ? new Date(internship.endDate) : today;
    return this.getInProgressTasks(internship) === 0 && endDate < today;
  }

  seeInfo(id: number | undefined): void {
    this.router.navigate(['/one-internship-tasks/' + id]);
  }

  generateReport(internship: ExtendedStudentInternship): void {
    this.service.getFinishedInternshipByStudent(internship.studentId || 3).subscribe({
      next: (report: ReportDto) =>{
        this.studentInternship = report;
        this.getReport();
      }
    });
  }

  getReport(): void {
    const doc = new jsPDF();
    const imgData = '../assets/psiho.jpg';

    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yOffset = 10;

    doc.addImage(imgData, 'JPEG', 10, yOffset, 190, 30);
    yOffset += 40;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 78, 121);
    doc.text(this.studentInternship.internshipTitle, 105, yOffset, { align: 'center' });
    yOffset += 20;

    const endDate = new Date(this.studentInternship.endDate);
    const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`End Date: ${formattedEndDate}`, 180, 20, { align: 'right' });

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Student Information:', margin, yOffset);
    yOffset += 10;

    doc.setFontSize(11);
    doc.setTextColor(70, 70, 70);
    doc.text(`Name: ${this.studentInternship.studentName} ${this.studentInternship.studentLastName}`, margin, yOffset);
    yOffset += 10;
    doc.text(`Points: ${this.studentInternship.studentInternshipPoints}`, margin, yOffset);
    yOffset += 10;

    doc.text(' ', margin, yOffset); // Empty row
    yOffset += 5;

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Mentor Information:', margin, yOffset);
    yOffset += 10;

    doc.setFontSize(11);
    doc.setTextColor(70, 70, 70);
    doc.text(`Name: ${this.studentInternship.psychologistName} ${this.studentInternship.psychologistLastName}`, margin, yOffset);
    yOffset += 10;

    doc.text(' ', margin, yOffset); // Empty row
    yOffset += 5;

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Done Tasks:', margin, yOffset);
    yOffset += 10;

    this.studentInternship.tasks.filter(task => task.status === StudentInternshipStatus.DONE).forEach((task, index) => {
      doc.setFontSize(11);
      doc.setTextColor(70, 70, 70);
      doc.text(`${index + 1}. ${task.title}`, margin, yOffset);
      yOffset += 5;

      const splitDescription = doc.splitTextToSize(task.description, 160); 
      doc.text(splitDescription, margin, yOffset);
      yOffset += splitDescription.length * 5;

      if (yOffset > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
      }

      yOffset += 10;
    });

    const totalTasks = this.studentInternship.tasks.length;
    const statusCounts = {
      [StudentInternshipStatus.IN_PROGRESS]: 0,
      [StudentInternshipStatus.DONE]: 0,
      [StudentInternshipStatus.NOT_REVIEWED]: 0,
      [StudentInternshipStatus.STUCK]: 0
    };

    this.studentInternship.tasks.forEach(task => {
      statusCounts[task.status]++;
    });

    const statusPercentages = {
      [StudentInternshipStatus.IN_PROGRESS]: (statusCounts[StudentInternshipStatus.IN_PROGRESS] / totalTasks) * 100,
      [StudentInternshipStatus.DONE]: (statusCounts[StudentInternshipStatus.DONE] / totalTasks) * 100,
      [StudentInternshipStatus.NOT_REVIEWED]: (statusCounts[StudentInternshipStatus.NOT_REVIEWED] / totalTasks) * 100,
      [StudentInternshipStatus.STUCK]: (statusCounts[StudentInternshipStatus.STUCK] / totalTasks) * 100
    };

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    doc.text('Task Achievement Analytics:', margin, yOffset);
    yOffset += 10;

    Object.keys(statusPercentages).forEach((status, index) => {
      doc.setFontSize(11);
      doc.setTextColor(70, 70, 70);
      doc.text(`${status}: ${statusPercentages[status as StudentInternshipStatus].toFixed(2)}%`, margin, yOffset + (index * 10));

      if (yOffset > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
      }

      yOffset += 2;
    });

    // Ensure "Mentor Comments during Internship" starts on a new page
    doc.addPage();
    yOffset = margin;

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);

    doc.setFontSize(14);
    doc.setTextColor(40, 64, 94);
    yOffset += 10;
    doc.text('Mentor Comments during Internship:', margin, yOffset);
    yOffset += 10;
  
    if (this.studentInternship.studentInternshipComments && this.studentInternship.studentInternshipComments.length > 0) {
      this.studentInternship.studentInternshipComments.forEach((comment, index) => {
        doc.setFontSize(11);
        doc.setTextColor(70, 70, 70);
        const splitComment = doc.splitTextToSize(comment, 170); 
        doc.text(splitComment, margin, yOffset);
        yOffset += splitComment.length * 6.5 + 2;

        if (yOffset > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
      });
    }

    doc.save('Student_Internship_Report.pdf');
  }
}
