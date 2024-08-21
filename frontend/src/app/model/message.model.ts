export interface Message {
    id?: number;
    studentId: number;
    studentName?: string;
    psychologistId: number;
    psychologistName?: string;
    studentInternshipId: number;
    content: string;
    read: boolean;
    sender: string;
}
