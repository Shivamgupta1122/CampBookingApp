import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let CampService = class CampService {
    constructor(http) {
        this.http = http;
        this.Url = "https://localhost:44324/Api";
    }
    getAllCamps() {
        return this.http.get(this.Url + '/Camp/AllCampDetails');
    }
    getCampById(campId) {
        return this.http.get(this.Url + `/Camp/GetCampDetailsById/${campId}`);
    }
    createCamp(data) {
        //use angular http to save data
        return this.http.post(this.Url + '/Camp/CreateCamp', data, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),
        });
    }
    deleteCamp(campId) {
        return this.http.delete(this.Url + `/Camp/DeleteCamp/${campId}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),
        });
    }
    updateCamp(camp) {
        return this.http.put(this.Url + '/Camp/UpdateCamp', camp, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),
        });
    }
    getFilteredCamps(checkin, checkout, Capacity) {
        return this.http.get(this.Url + `/Camp/GetCampsBetween/${checkin}/${checkout}/${Capacity}`);
    }
};
CampService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CampService);
export { CampService };
//# sourceMappingURL=camp.service.js.map