import { RegisteredUser } from "./registeredUser.model";
import { WorkshopTest } from "./workshopTest.model";

export interface TestResultDto{
    id: number;
    achievedPoints: number;
    passed: boolean;
    workshopTest?: WorkshopTest;
    registeredUser?: RegisteredUser; 
}

