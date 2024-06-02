import { StudentInternship, StudentInternshipPriority, StudentInternshipStatus } from "./studentInternship.model";

export interface JournalingTasks {
    id: number;
    operationType: string;
    title: string;
    description: string;
    status: StudentInternshipStatus;
    priority: StudentInternshipPriority;
    numOfTasksWithSameStatus: number;
    numOfTasksWithSamePriority: number;
    dateFilled: Date;
}