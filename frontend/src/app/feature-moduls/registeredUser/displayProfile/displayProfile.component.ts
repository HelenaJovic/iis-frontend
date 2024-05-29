// // displayProfile.component.ts

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../sessions/model/User';
import { ToastrService } from 'ngx-toastr';

// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RegisteredUser } from '../../model/RegisteredUser';
// import { RegisteredUserService } from '../registeredUser.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-profile', // Adjust the selector as needed
  templateUrl: './displayProfile.component.html',
  styleUrls: ['./displayProfile.component.css'],
})
export class DisplayProfile {
  user: User = {} as User;
  profileForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    //private service: RegisteredUserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      name: [''],
      password: [''],
      email: [''],
      username: [''],
    });
  }

  //   ngOnInit(): void {
  //     this.loadProfileData();
  //   }

  //   loadProfileData() {
  //     console.log('Loading profile data...');

  //     this.service.getProfile(1).subscribe({
  //       next: (data: User) => {
  //         console.log('data je' + data);
  //         this.user.id = data.id;
  //         this.user.name = data.name;
  //         this.user.email = data.email;
  //         this.user.password = data.password;

  //           this.profileForm.setValue({
  //             id: this.user.id,
  //             name: this.user.name,
  //             password: '',
  //             email: this.user.email
  //           });
  //         },

  //       error: (err: any) => {
  //         console.log(err);
  //       },
  //     });
}

//   editProfile() {
//     this.isEditing = !this.isEditing;

//     if (this.isEditing) {
//       this.profileForm.enable();
//     } else {
//       this.profileForm.disable();
//     }
//   }

//   updateProfile() {
//     console.log('Form value:', this.profileForm.value);

//     const updatedData = {
//       id: this.profileForm.value.id,
//       password: this.profileForm.value.password,
//       firstname: this.profileForm.value.firstname,
//       lastname: this.profileForm.value.lastname,
//       email: this.registeredUser.email,
//       occupation: this.profileForm.value.occupation,
//       address: {
//         country: this.profileForm.value.country,
//         city: this.profileForm.value.city,
//         street: this.profileForm.value.street,
//         number: this.profileForm.value.number,
//       },
//       phoneNumber: this.profileForm.value.phoneNumber,
//       penaltyPoints: this.profileForm.value.penaltyPoints,
//       userCategory: this.profileForm.value.userCategory,
//       loyaltyProgram:this.registeredUser.loyaltyProgram
//     };
//     console.log("tu sam")

//     console.log("Ovo je", JSON.stringify(updatedData, null, 2));

//     this.service.updateProfile(updatedData, 1).subscribe({
//       next: (data: any) => {
//         console.log('Profile updated successfully:', data);
//         this.loadProfileData();
//       },
//       error: (err: any) => {
//         console.error('Error updating profile:', err);
//       }
//     });
//   }
//   loyaltyProgramAdvantages() {
//     this.toastr.success('You have ' + this.registeredUser.loyaltyProgram.discountPercentage + ' % discount on all...', 'Success', {
//       positionClass: 'toast-top-right',
//       toastClass: 'toast-custom-style', // Dodajte svoj CSS stil za prilagođavanje izgleda
//       titleClass: 'toast-custom-title', // Dodajte svoj CSS stil za prilagođavanje izgleda
//     });
//   }
