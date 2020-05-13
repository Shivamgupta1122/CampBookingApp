import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let BookingConfirmComponent = class BookingConfirmComponent {
    constructor(route, bookingService) {
        this.route = route;
        this.bookingService = bookingService;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bookingId = this.route.snapshot.paramMap.get('bookingId');
            (yield this.bookingService.getBookingById(this.bookingId))
                .subscribe((booking) => {
                this.booking = booking;
            });
            console.log(this.booking);
        });
    }
};
BookingConfirmComponent = __decorate([
    Component({
        selector: 'app-confirmbooking',
        templateUrl: './confirmbooking.component.html',
        styleUrls: ['./confirmbooking.component.css']
    })
], BookingConfirmComponent);
export { BookingConfirmComponent };
//# sourceMappingURL=confirmbooking.component.js.map