import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(route) {
        this.route = route;
    }
    canActivate(next, state) {
        if (localStorage.getItem('userToken') != null)
            return true;
        else {
            this.route.navigate(['/adminLogin']);
            return false;
        }
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map