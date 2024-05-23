import { WorkshopAnswer } from "./workshopAnswer.model";

export interface WorkshopQuestion{
    id: number;
    text: string;
    pointsPerQuestion: number;
    testAnswers: WorkshopAnswer[];
  }

