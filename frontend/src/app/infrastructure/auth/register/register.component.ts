import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/feature-moduls/sessions/model/User';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/feature-moduls/sessions/model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnChanges {
  passwordsMatch: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    registerAsStudent: new FormControl(false),
  });

  registerUser(): void {
    const user: Register = {
      name: this.userForm.value.name || '',
      username: this.userForm.value.username || '',
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
      lastname: this.userForm.value.lastName || '',
      registerAsStudent: this.userForm.value.registerAsStudent === true,
      registerAsPsychologist: false,
      registerAsManager: false,
    };

    if (!this.userForm.valid) {
      return;
    }

    this.service.signUp(user).subscribe({
      next: () => {
        console.log(user);
        alert('Confirm your registration by email');
        this.router.navigate(['/login']);
        this.userForm.reset();
      },
      error: (error) => {
        console.error(error);
        console.log('postoji mail');
        this.router.navigate(['/failRegistration']);
      },
    });
  }
}
