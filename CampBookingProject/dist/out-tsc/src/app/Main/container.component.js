import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ContainerComponent = class ContainerComponent {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    ngOnInit() {
        this.service.sharedMessage.subscribe((message) => (this.message = message));
    }
    logOut() {
        this.service.isAdmin(false);
        localStorage.removeItem('userToken');
        this.router.navigate(['/AdminLogin']);
    }
};
ContainerComponent = __decorate([
    Component({
        selector: 'app-main',
        templateUrl: './container.component.html',
        styleUrls: ['./container.component.css']
    })
], ContainerComponent);
export { ContainerComponent };
//# sourceMappingURL=container.component.js.map