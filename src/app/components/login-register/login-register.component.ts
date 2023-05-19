import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  ShowRegister: boolean = false;
  ShowPassword: boolean = false;
  RegisterForm: FormGroup;
  loginForm: FormGroup;
  cookieValue: any;
  isError: boolean = false;
  loading: boolean = false;
  errorMessage: String = "";
  errorText: String = "";
  constructor(private fb: FormBuilder, private userService: UserService, private cookieService: CookieService) {

    
    this.RegisterForm = this.fb.group({

      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.loginForm = this.fb.group({

      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],

    })
  }

  get username() { return this.RegisterForm.get('username'); }
  get email() { return this.RegisterForm.get('email'); }
  get password() { return this.RegisterForm.get('password'); }

  get usernameLogin() { return this.loginForm.get('username'); }
  get passwordLogin() { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.ShowRegister = localStorage.getItem("switch") == "true" ? true : false

  }

  switch() {

    this.isError = false
    this.ShowRegister = !this.ShowRegister
    localStorage.setItem("switch",`${this.ShowRegister}`)

  }

  error() {
    this.isError = false;
  }

  RegisterFormFunction() {
    this.loading = true
    const form = this.RegisterForm.value

    this.userService.register(form).subscribe(resp => {


      this.loading = false

    }, error => {

      this.loading = false

      if (error.status == 400) {
        this.isError = true;
        this.errorMessage = " " + error.error.message.split(":")[1]
        this.errorText = "Register Error :"
      }
    });

  }

  PasswordShowFunction() {
    this.ShowPassword = !this.ShowPassword

    let password = document.getElementById("password")
    if (this.ShowPassword == true) {
      // @ts-ignore
      password.type = "text"
    } else {
      // @ts-ignore
      password.type = "password"
    }
  }

  login() {

    this.loading = true

    const form = this.loginForm.value

    this.userService.login(form).subscribe(resp => {

      this.loading = false


    }, error => {

      this.loading = false

      if (error.status == 401) {
        this.isError = true;
        this.errorMessage = " Password OR Username Wrong"
        this.errorText = "Login Error :"
      }
    });

  }


}
