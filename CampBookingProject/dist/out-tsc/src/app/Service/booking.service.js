import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let BookingService = class BookingService {
    constructor(http) {
        this.http = http;
        this.Url = "https://localhost:44324/Api";
    }
    postBooking(booking) {
        return this.http.post(this.Url + '/Booking/InitiateBooking', booking);
    }
    confirmBooking(bookingRefNo) {
        //console.log("in service.."+bookingRefNo)
        return this.http.get(this.Url + `/ConfirmBooking/${bookingRefNo}`);
    }
    deleteBooking(bookingRefNo) {
        return this.http.delete(this.Url + `/Booking/CancelBooking/${bookingRefNo}`);
    }
    getBookingByReferenceNumber(bookingRefNo) {
        return this.http.get(this.Url + `/Booking/GetBooking/${bookingRefNo}`);
    }
    getBookingById(bookingId) {
        return this.http.get(this.Url + `/${bookingId}`);
    }
    bookCamp(data) {
        console.log(data);
        //use angular http to save data
        return this.http.post(this.Url + '/Booking/InitiateBooking', data);
    }
};
BookingService = __decorate([
    Injectable()
], BookingService);
export { BookingService };
//# sourceMappingURL=booking.service.js.map