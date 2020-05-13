import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.isAdminHeader = new BehaviorSubject(false);
        this.sharedMessage = this.isAdminHeader.asObservable();
        this.Url = "https://localhost:44324/Api";
    }
    isAdmin(message) {
        this.isAdminHeader.next(message);
    }
    UserAuthentication(userName, password) {
        var data = 'UserName=' + userName + '&Password=' + password + '&grant_type=password';
        var reqHeader = new HttpHeaders({
            'Context-Type': 'application/x-www-urlencoded',
        });
        return this.http.post(this.Url + '/token', data, {
            headers: reqHeader,
        });
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map