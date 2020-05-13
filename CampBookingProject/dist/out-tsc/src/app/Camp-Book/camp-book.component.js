import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let CampBookingComponent = class CampBookingComponent {
    constructor(bookingService, campService, router, activatedRouter, errorHandler) {
        this.bookingService = bookingService;
        this.campService = campService;
        this.router = router;
        this.activatedRouter = activatedRouter;
        this.errorHandler = errorHandler;
        this.errorMessage = '';
        this.weekdays = 0;
        this.nonWeekdays = 0;
        this.weekEndAmnt = 0;
        this.weekDayAmnt = 0;
        this.TotalAmount = 0;
        this.fileName = "No file selected";
    }
    CountWeekDays(checkin, checkout) {
        let bookingCheckin = new Date(checkin);
        let bookingCheckout = new Date(checkout);
        for (let dt = bookingCheckin; dt < bookingCheckout; dt.setDate(dt.getDate() + 1)) {
            if ((dt.getDay() == 0) || (dt.getDay() == 5) || (dt.getDay() == 6)) {
                this.weekdays++;
            }
            else {
                this.nonWeekdays++;
            }
        }
    }
    ngOnInit() {
        this.campId = +this.activatedRouter.snapshot.paramMap.get('CampId');
        console.log("inside booking component ngoninit campid");
        console.log(this.campId);
        this.campService.getCampById((this.campId)).subscribe((response) => {
            this.Camp = response;
            this.imageUrl = this.Camp.imageURL;
        });
        this.capacityControl = new FormControl('', [Validators.required]);
        this.checkinControl = new FormControl('', [Validators.required]);
        this.checkoutControl = new FormControl('', [Validators.required]);
        this.billingaddressControl = new FormControl('', [Validators.required]);
        this.stateControl = new FormControl('', [Validators.required]);
        this.zipcodeControl = new FormControl('', [Validators.required]);
        this.phoneControl = new FormControl('', [Validators.required]);
        this.countryControl = new FormControl('', [Validators.required]);
        this.guestcontrol = new FormControl('', [Validators.required]);
        this.bookForm = new FormGroup({
            TotalNights: this.capacityControl,
            CheckInDate: this.checkinControl,
            CheckOutDate: this.checkoutControl,
            billingaddress: this.billingaddressControl,
            state: this.stateControl,
            zipcode: this.zipcodeControl,
            CellPhone: this.phoneControl,
            country: this.countryControl,
            TotalGuests: this.guestcontrol
        });
        //  this.formInitiaLizer()
    }
    /* calculateFinalAmount()
      {
         var checkin =  Date.parse(this.bookForm.value["CheckInDate"])
         var checkout =  this.bookForm.value["CheckOutDate"]
         
      }*/
    OnFormSubmit() {
        // const{Capacity,checkin,checkout,billingaddress,state,country,phone,zipcode}=this.bookForm.value
        this.bookForm.value["CampId"] = this.campId;
        this.bookForm.value["UserId"] = 1;
        this.bookForm.value["FinalAmount"] = 1800;
        //   this.router.navigateByUrl('/Booking/ConfirmBooking',this.bookForm.value)
        this.bookingService.bookCamp(this.bookForm.value).subscribe((response) => {
            window.alert("Your booking Reference number is:" + response);
            this.router.navigate(['/Camp/AllCampDetails']);
        }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
        });
    }
};
CampBookingComponent = __decorate([
    Component({
        selector: 'app-campbook',
        templateUrl: './camp-book.component.html',
        styleUrls: ['./camp-book.component.css']
    })
], CampBookingComponent);
export { CampBookingComponent };
//# sourceMappingURL=camp-book.component.js.map