import { RegisteredUser } from "./registeredUser.model";
import { WorkshopTest } from "./workshopTest.model";

    export interface WorkshopEvaluationDto {
        workshopName: string;
        femaleParticipation: number;
        maleParticipation: number;
        finalGrade: number;
        totalNumberOfFeedback: number;
        totalNumberOfParticipants: number;
        gradeByFemale: number;
        gradeByMale: number;
        totalContentGrade: number;
        totalPsychologicalGrade: number;
        totalOrgGrade: number;
        totalPriceGrade: number;
        numberRecommended: number;
        numberNotRecommended: number;
    }


