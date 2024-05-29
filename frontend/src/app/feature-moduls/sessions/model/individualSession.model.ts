import { Time } from '@angular/common';
import { Register } from './register.model';

export interface IndividualSession {
  id?: number;
  date: Date;
  startTime: Time;
  endTime: Time;
  psychologistId: number;
  sessionGoal: String;
  registeredUserId: number;
}
