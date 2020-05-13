import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.isLoginError = false;
    }
    ngOnInit() {
        this.EmailControl = new FormControl('', [Validators.required]);
        this.PasswordControl = new FormControl('', [Validators.required]);
        this.textControl = new FormControl('', [Validators.required]);
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
        this.service.UserAuthentication(userName, password).subscribe((data) => {
            window.localStorage.setItem('userToken', data.access_token);
            this.adminHeader();
            this.router.navigate(['/ManageCamp/AllCamps']);
        }, (err) => {
            this.isLoginError = true;
        });
    }
    /**
     * admin header to show login and logout if the user is logged in or logged out
     */
    adminHeader() {
        this.service.isAdmin(true);
    }
    getControlValidationClasses(control) {
        return {
            'is-invalid': control.touched && control.invalid,
            'is-valid': control.touched && control.valid,
        };
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map