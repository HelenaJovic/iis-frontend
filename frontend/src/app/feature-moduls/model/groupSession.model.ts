import { Time } from '@angular/common';

export interface GroupSession {
  id?: number;
  date: Date;
  startTime: Time;
  endTime: Time;
  psychologistId: number;
  participantsNumber: number;
  topic: string;
  registeredUserIds: number[];
}
