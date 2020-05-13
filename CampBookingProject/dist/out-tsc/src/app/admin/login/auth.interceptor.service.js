import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
let AuthInterceptor = class AuthInterceptor {
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone());
        }
        if (localStorage.getItem('userToken') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedReq).pipe(tap(succ => { }, err => {
                if (err.status == 401) {
                    localStorage.removeItem('userToken');
                    this.router.navigate(['/adminLogin']);
                }
            }));
        }
        else
            return next.handle(req.clone());
    }
};
AuthInterceptor = __decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.service.js.map