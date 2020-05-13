import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
let ManagebookingComponent = class ManagebookingComponent {
    constructor(router, activatedRouter) {
        this.router = router;
        this.activatedRouter = activatedRouter;
    }
    /**
     * Initialize the text and form control values
     */
    ngOnInit() {
        this.referencenumberControl = new FormControl('', [Validators.required]);
        this.textControl = new FormControl('', [Validators.required]);
        this.bookManageForm = new FormGroup({
            referencenumber: this.referencenumberControl,
        });
    }
    /**
     * Pass the form book values for booking reference number
     */
    OnFormSubmit() {
        let bookingReferenceNumber = this.bookManageForm.value['referencenumber'];
        this.router.navigate(['/editbooking', bookingReferenceNumber]);
    }
    /**
     * get Validation control for the given Form control
     * i.e valid or invalid
     */
    getControlValidationClasses(control) {
        return {
            'is-invalid': control.touched && control.invalid,
            'is-valid': control.touched && control.valid,
        };
    }
};
ManagebookingComponent = __decorate([
    Component({
        selector: 'app-bookcamp',
        templateUrl: './managebooking.component.html',
        styleUrls: ['./managebooking.component.css'],
    })
], ManagebookingComponent);
export { ManagebookingComponent };
//# sourceMappingURL=managebooking.component.js.map