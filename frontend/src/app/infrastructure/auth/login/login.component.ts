import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthServiceService } from '../register/auth-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  user: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    lastName: '',
    username: '',
    roles: [],
    image: ''
  };
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  LogIn() {
    const user: any = {
      usernameOrEmail: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe((data: any) => {
      console.log(data);
      this.userForm.reset();
      this.router.navigate(['']);
    });
  }
}
