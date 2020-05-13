import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let CampListComponent = class CampListComponent {
    constructor(service, router, errorHandler) {
        this.service = service;
        this.router = router;
        this.errorHandler = errorHandler;
        this.page = 1;
        this.loadingComplete = false;
        this.errorMessage = '';
    }
    ngOnInit() {
        this.checkIn = this.getDate(new Date(new Date().getTime()));
        this.checkOut = this.getDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
        this.capacity = 0;
        this.allFilteredCamps(this.checkIn, this.checkOut, this.capacity);
        this.FilteredCampsInit();
        this.getAllCamps();
    }
    FilteredCampsInit() {
        this.checkInControl = new FormControl(this.checkIn, [Validators.required]);
        this.checkOutControl = new FormControl(this.checkOut, [Validators.required]);
        this.capacityControl = new FormControl('', [Validators.required]);
        this.FilterCamps = new FormGroup({
            checkInDate: this.checkInControl,
            checkOutDate: this.checkOutControl,
            capacity: this.capacityControl
        });
    }
    allFilteredCamps(checkin, checkout, Capacity) {
        console.log(checkin, checkout, Capacity);
        this.service.getFilteredCamps(checkin, checkout, Capacity).
            subscribe((res) => {
            this.CampList = res;
            if (res) {
                this.totalRecords = res.length;
            }
            this.loadingComplete = true;
            console.log("res");
            console.log(res);
        }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
        });
    }
    getDate(d) {
        var output = d.getFullYear() + '-' +
            ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' +
            (d.getDate() < 10 ? '0' : '') + d.getDate();
        return output;
    }
    getAllCamps() {
        this.service.getAllCamps().subscribe((camps) => {
            this.CampList = camps;
            console.log(this.CampList);
        }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
        });
    }
    navigateToCreateCamp() {
        this.router.navigateByUrl('/Api/Camp/CreateCamp');
    }
    onFormSubmit() {
        const { checkInDate, checkOutDate, capacity } = this.FilterCamps.value;
        this.loadingComplete = false;
        this.allFilteredCamps(checkInDate, checkOutDate, capacity);
    }
    getControlValidationClasses(control) {
        return {
            'is-invalid': control.touched && control.invalid,
            'is-valid': control.touched && control.valid
        };
    }
    populateFilter() {
        return Array.from({ length: 10 }, (x, i) => i + 1);
    }
    bookMyCamp(camp) {
        console.log("camp");
        console.log(camp);
        console.log("camp id");
        console.log(camp.id);
        this.router.navigate(['/bookCamp', camp.id]);
        // console.log('update req');
    }
};
CampListComponent = __decorate([
    Component({
        selector: 'app-camp-list',
        templateUrl: './camp-list.component.html',
        styleUrls: ['./camp-list.component.css']
    })
], CampListComponent);
export { CampListComponent };
//# sourceMappingURL=camp-list.component.js.map