import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let CampNewComponent = class CampNewComponent {
    constructor(services, router) {
        this.services = services;
        this.router = router;
        this.fileName = "No file selected";
        this.enterImage = true;
    }
    ngOnInit() {
        this.weekDayControl = new FormControl('', [Validators.required]);
        this.weekendControl = new FormControl('', [Validators.required]);
        this.capacityControl = new FormControl('', [Validators.required]);
        this.descriptionControl = new FormControl('', [Validators.required]);
        this.titleControl = new FormControl('', [Validators.required]);
        this.imageControl = new FormControl('');
        this.campForm = new FormGroup({
            Capacity: this.capacityControl,
            PriceForWeekDays: this.weekDayControl,
            PriceForWeekends: this.weekendControl,
            Description: this.descriptionControl,
            Title: this.titleControl,
            ImageURL: new FormControl('')
        });
    }
    handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        //console.log(btoa(binaryString));
    }
    onFileChange(file) {
        if (file) {
            this.enterImage = false;
            this.fileName = file.name;
            this.file = file;
            const reader = new FileReader();
            const reader2 = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
            reader2.readAsDataURL(file);
            reader2.onload = event => {
                this.imageUrl = reader2.result;
            };
        }
    }
    OnFormSubmit() {
        this.campForm.value["ImageURL"] = 'data:image/jpg;base64,' + this.base64textString;
        console.log(this.campForm.value);
        this.services.createCamp(this.campForm.value).subscribe(() => {
            this.router.navigateByUrl('/dashboard');
            //  this.router.navigateByUrl('/Camp/AllCampDetails')
        });
    }
    getControlValidationClasses(control) {
        return {
            'is-invalid': control.touched && control.invalid,
            'is-valid': control.touched && control.valid
        };
    }
};
CampNewComponent = __decorate([
    Component({
        selector: 'app-newcamp',
        templateUrl: './camp-new.component.html',
        styleUrls: ['./camp-new.component.css']
    })
], CampNewComponent);
export { CampNewComponent };
//# sourceMappingURL=camp-new.component.js.map