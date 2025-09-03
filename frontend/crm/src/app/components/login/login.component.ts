import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm ={
  email:'',
  password:''
}
showPassword= false;

  constructor() { }

  ngOnInit(): void {
    this.loginForm
  }

  onSubmit(): void {
    console.log(this.loginForm);
    // Handle form submission here
  }
  togglePasswordVisibility(){

    this.showPassword= !this.showPassword
  }
  onLogin(){
  }
}
