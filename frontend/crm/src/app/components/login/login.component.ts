import { Component, OnInit } from '@angular/core';
import { LoginCredentials, LoginResponse } from '../../interfaces/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:LoginCredentials = {
    email: '',
    password: ''
  }
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loginForm
  }

  onSubmit(): void {
    console.log(this.loginForm);
    // Handle form submission here
  }
  togglePasswordVisibility(): void {

    this.showPassword = !this.showPassword
  }
  onLogin(): void {
  }
}
