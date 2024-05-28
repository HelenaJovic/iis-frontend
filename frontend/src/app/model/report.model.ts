import { Task } from "./studentInternship.model";

export interface ReportDto {
    studentName: string;
    studentLastName: string;
    psychologistName: string;
    psychologistLastName: string;
    studentInternshipPoints: number;
    internshipTitle: string;
    endDate: Date;
    tasks: Task[]; 
}
