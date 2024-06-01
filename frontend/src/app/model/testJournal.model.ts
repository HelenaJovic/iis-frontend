import { RegisteredUser } from "./registeredUser.model";
import { WorkshopTest } from "./workshopTest.model";

export interface TestJournal{
    id: number;
    achievedPoints: number;
    average_score: number;
    pass_rate: number;
    attempt_count: number;
    dateFilled :Date;
    passed: boolean;
    workshopTest?: WorkshopTest;
    registeredUser?: RegisteredUser; 
}

