import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeSlot } from '../model/timeSlot.model';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { SessionServiceService } from '../service/session-service.service';
import Swal from 'sweetalert2';
import { GroupSession } from '../model/groupSession.model';

@Component({
  selector: 'app-create-group-session',
  templateUrl: './create-group-session.component.html',
  styleUrls: ['./create-group-session.component.css'],
})
export class CreateGroupSessionComponent {
  selectedDate: Date | undefined;
  finalDate: Date | undefined;
  timeSlots: TimeSlot[] | undefined;
  loggedInUserId: number | undefined;
  selectedSlot: TimeSlot | undefined;

  constructor(
    private authService: AuthServiceService,
    private sessionService: SessionServiceService
  ) {}
  sessionForm = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    participantsNumber: new FormControl('', [Validators.required]),
  });

  onDateSelected(event: Date) {
    this.selectedDate = event;
    this.loggedInUserId = parseInt(this.authService.getUserId());
    this.sessionService
      .getFreeSlots(
        this.loggedInUserId,
        this.selectedDate.toISOString().split('T')[0]
      )
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
    var numOfParticipants = parseInt(
      this.sessionForm.value.participantsNumber!
    );

    const groupSession: GroupSession = {
      date: this.selectedDate!,
      startTime: this.selectedSlot?.startTime!,
      endTime: this.selectedSlot?.endTime!,
      psychologistId: this.loggedInUserId!,
      topic: this.sessionForm.value.topic!,
      participantsNumber: numOfParticipants,
      registeredUserIds: [],
    };

    this.sessionService.createGroupSession(groupSession).subscribe({
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
