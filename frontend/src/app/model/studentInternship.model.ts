export interface StudentInternship {
    id?: number;
    studentId?: number;
    psychologistId?: number;
    studentInternshipPoints?: number;
    tasks: Task[];
    comments: string[];
}

export interface Task {
    id?: number;
    title: string;
    description: string;
    status: StudentInternshipStatus;
    priority: StudentInternshipPriority;
    studentInternshipId: number;
    pdfUrl: string;
    editable?: boolean;
}

export enum StudentInternshipStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    NOT_REVIEWED = 'NOT_REVIEWED',
    STUCK = 'STUCK'
}

export enum StudentInternshipPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

