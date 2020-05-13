import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AllCampsComponent = class AllCampsComponent {
    constructor(campService, bookingService, route, errorHandler) {
        this.campService = campService;
        this.bookingService = bookingService;
        this.route = route;
        this.errorHandler = errorHandler;
        this.errorMessage = '';
        this.loadingComplete = false;
    }
    ngOnInit() {
        this.allCamps();
    }
    allCamps() {
        this.campService.getAllCamps()
            .subscribe((response) => {
            this.Camps = response;
            this.loadingComplete = true;
            console.log(response);
        }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
        });
    }
    deleteCamp(camp) {
        this.campService.deleteCamp(camp.id)
            .subscribe((camp) => {
            console.log(camp);
            console.log('is deleted');
            // this.allCamps();
        });
    }
    updateCamp(camp) {
        this.route.navigate(['/UpdateCamp', camp.id]);
        console.log("Update Available");
    }
    navigateToCreateCamp() {
        this.route.navigateByUrl('/Camp/CreateCamp');
    }
};
AllCampsComponent = __decorate([
    Component({
        selector: 'app-all-camps',
        templateUrl: './all-camps.component.html',
        styleUrls: ['./all-camps.component.css']
    })
], AllCampsComponent);
export { AllCampsComponent };
//# sourceMappingURL=all-camps.component.js.map