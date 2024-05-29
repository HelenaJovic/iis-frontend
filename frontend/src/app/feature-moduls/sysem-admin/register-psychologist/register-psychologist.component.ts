import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { Register } from '../../sessions/model/register.model';

@Component({
  selector: 'app-register-psychologist',
  templateUrl: './register-psychologist.component.html',
  styleUrls: ['./register-psychologist.component.css'],
})
export class RegisterPsychologistComponent implements OnChanges {
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
    registerAsPsychologist: new FormControl(false),
    registerAsManager: new FormControl(false),
  });

  registerUser(): void {
    const user: Register = {
      name: this.userForm.value.name || '',
      username: this.userForm.value.username || '',
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
      lastname: this.userForm.value.lastName || '',
      registerAsStudent: false,
      registerAsPsychologist:
        this.userForm.value.registerAsPsychologist === true,
      registerAsManager: this.userForm.value.registerAsManager === true,
    };

    if (!this.userForm.valid) {
      return;
    }

    this.service.signUp(user).subscribe({
      next: () => {
        console.log(user);
        alert('Confirm your registration by email');
        this.router.navigate(['/']);
        this.userForm.reset();
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/failRegistration']);
      },
    });
  }
}
