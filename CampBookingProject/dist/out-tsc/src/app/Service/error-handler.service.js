import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ErrorHandlerService = class ErrorHandlerService {
    constructor(router) {
        this.router = router;
        this.errorMessage = '';
    }
    handleError(error) {
        if (error.status === 500) {
            this.handle500Error(error);
        }
        else if (error.status === 404) {
            this.handle404Error(error);
        }
        else {
            this.handleOtherError(error);
        }
    }
    handle500Error(error) {
        this.createErrorMessage(error);
        this.router.navigate(['/500']);
    }
    handle404Error(error) {
        this.createErrorMessage(error);
        this.router.navigate(['/404']);
    }
    handleOtherError(error) {
        this.createErrorMessage(error);
        //TODO: this will be fixed later;
    }
    createErrorMessage(error) {
        this.errorMessage = error.error ? error.error : error.statusText;
    }
};
ErrorHandlerService = __decorate([
    Injectable()
], ErrorHandlerService);
export { ErrorHandlerService };
//# sourceMappingURL=error-handler.service.js.map