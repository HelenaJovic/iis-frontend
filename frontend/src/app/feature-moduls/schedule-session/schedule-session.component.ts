import { Component, OnInit } from '@angular/core';
import { GroupSession } from '../model/groupSession.model';
import { SessionServiceService } from '../service/session-service.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { Psychologist } from '../model/psychologist.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeSlot } from '../model/timeSlot.model';
import Swal from 'sweetalert2';
import { IndividualSession } from '../model/individualSession.model';

@Component({
  selector: 'app-schedule-session',
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.css'],
})
export class ScheduleSessionComponent implements OnInit {
  groupSessions: GroupSession[] | undefined;
  loggedInUserId: number | undefined;
  psychologists: Psychologist[] | undefined;
  selectedDate: Date | undefined;
  timeSlots: TimeSlot[] | undefined;
  selectedSlot: TimeSlot | undefined;

  constructor(
    private groupSessionService: SessionServiceService,
    private authService: AuthServiceService
  ) {}

  sessionForm = new FormGroup({
    sessionGoal: new FormControl('', [Validators.required]),
    Psychologist: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.groupSessionService.getAll().subscribe({
      next: (result) => {
        this.groupSessions = result;
      },
    });

    this.groupSessionService.getAllPsychologist().subscribe({
      next: (result) => {
        this.psychologists = result;
      },
    });
  }

  reserve(session: GroupSession) {
    this.loggedInUserId = parseInt(this.authService.getUserId());
    this.groupSessionService
      .reserveSession(session, this.loggedInUserId)
      .subscribe({
        next: (result) => {
          console.log(result);

          this.groupSessions = this.groupSessions!.filter(
            (s) => s.id !== result.id
          );
        },
      });
  }

  onDateSelected(event: Date) {
    this.selectedDate = event;
    this.loggedInUserId = parseInt(this.authService.getUserId());
    var psychologId = parseInt(this.sessionForm.value.Psychologist!);
    this.groupSessionService
      .getFreeSlots(psychologId, this.selectedDate.toISOString().split('T')[0])
      .subscribe({
        next: (result) => {
          this.timeSlots = result;
          console.log(result);
        },
      });
  }

  saveTime(slot: TimeSlot, event: MouseEvent) {
    this.selectedSlot = slot;
    Swal.fire({
      icon: 'success',
      title: 'Time selected',
      text: 'You have successfully selected time.',
    });
    this.timeSlots = [];
  }

  finish() {
    var psychologId = parseInt(this.sessionForm.value.Psychologist!);

    const individualSession: IndividualSession = {
      date: this.selectedDate!,
      startTime: this.selectedSlot?.startTime!,
      endTime: this.selectedSlot?.endTime!,
      psychologistId: psychologId,
      registeredUserId: this.loggedInUserId!,
      sessionGoal: this.sessionForm.value.sessionGoal!,
    };

    this.groupSessionService
      .createIndividualSession(individualSession)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.sessionForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Group session created',
            text: 'You have successfully created group session.',
          });
        },
      });
  }
}
