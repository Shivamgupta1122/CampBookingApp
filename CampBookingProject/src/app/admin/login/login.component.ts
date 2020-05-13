import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CampService } from 'src/app/Service/camp.service';
import { BookingService } from 'src/app/Service/booking.service';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    EmailControl: FormControl;
    PasswordControl: FormControl;
    textControl:FormControl;
    isLoginError: boolean = false;
    constructor(private service: AuthService, private router: Router) {}
    ngOnInit(): void {
      this.EmailControl = new FormControl('', [Validators.required]);
      this.PasswordControl = new FormControl('', [Validators.required]);
      this.textControl= new FormControl('', [Validators.required]);
      this.loginForm = new FormGroup({
        Email: this.EmailControl,
        Password: this.PasswordControl,
      });
    }
    /**
     * take the userName and password values from the form and then authenticate the 
     * user using the userToken if the user is valid then show details to manage camps
     */
    OnSubmit() {
      let userName = this.loginForm.value['Email'];
      let password = this.loginForm.value['Password'];
      console.log(userName)
      console.log(password)
      this.service.UserAuthentication(userName, password).subscribe(
        (data: any) => {
            console.log('data')
            console.log(data)
          window.localStorage.setItem('userToken', data.access_token);
          this.adminHeader();
          this.router.navigate(['/dashboard']);
        console.log(data.access_token)
        },
        (err: HttpErrorResponse) => {
            console.log('inside err')
            console.log(err)
          this.isLoginError = true;
        }
      );
    }
  /**
   * admin header to show login and logout if the user is logged in or logged out 
   */
    adminHeader() {
      this.service.isAdmin(true);
    }
    getControlValidationClasses(control: FormControl) {
      return {
        'is-invalid': control.touched && control.invalid,
        'is-valid': control.touched && control.valid,
      };
    }
}