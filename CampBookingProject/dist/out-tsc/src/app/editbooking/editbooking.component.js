import { __decorate } from "tslib";
import { Component } from '@angular/core';
let EditbookingComponent = class EditbookingComponent {
    constructor(services, router, activatedRouter, errorHandler) {
        this.services = services;
        this.router = router;
        this.activatedRouter = activatedRouter;
        this.errorHandler = errorHandler;
        this.isFutureBooking = false;
        this.errorMessage = '';
    }
    /**
     * get reference number of booking to be edited and then call getBookingByReferenceNumber
  
     * to fetch booking details of that particular booking
  
     */
    ngOnInit() {
        this.referenceNumber = this.activatedRouter.snapshot.paramMap.get('id');
        console.log(this.referenceNumber);
        this.services
            .getBookingByReferenceNumber(this.referenceNumber)
            .subscribe((res) => {
            this.isFutureBooking = new Date() < new Date(res["checkInDate"]);
            this.requiredBooking = res;
            console.log(this.isFutureBooking);
            console.log(this.requiredBooking);
        }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
        });
    }
    /**
    
     * Delete the booking using its reference number and then navigate to AllCampDetails page
    
     * @param referenceNumber booking reference number
    
     */
    DeleteBooking(referenceNumber) {
        console.log(referenceNumber);
        this.services.deleteBooking(referenceNumber).subscribe(() => {
            this.router.navigate(['/Camp/AllCampDetails']);
        }), (err) => {
            window.alert('You are not allowed to cancel past bookings..');
        };
    }
};
EditbookingComponent = __decorate([
    Component({
        selector: 'app-editbooking',
        templateUrl: './editbooking.component.html',
        styleUrls: ['./editbooking.component.css'],
    })
], EditbookingComponent);
export { EditbookingComponent };
//# sourceMappingURL=editbooking.component.js.map