import { Time } from '@angular/common';

export interface IndividualSession {
  id?: number;
  date: Date;
  startTime: Time;
  endTime: Time;
  psychologistId: number;
  sessionGoal: String;
  registeredUserId: number;
}
