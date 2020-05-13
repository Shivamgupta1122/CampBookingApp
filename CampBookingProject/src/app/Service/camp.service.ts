import { Injectable } from '@angular/core';    
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';    
import { Camp } from '../Models/camp.model';


@Injectable({  
    providedIn: 'root'  
  })  
export class CampService{
    readonly Url = "https://localhost:44324/Api"
    constructor(private http : HttpClient){}

    getAllCamps() {
        return this.http.get(this.Url + '/Camp/AllCampDetails')
    }
    getAllDashboardCamps()
    {
      return this.http.get(this.Url + '/Camp/AllDashboardCamps')
    }
    getCampById(campId : number) {
        return this.http.get(this.Url + `/Camp/GetCampDetailsById/${campId}`)
    }
    createCamp(data:Camp){
        //use angular http to save data
         return this.http.post(this.Url + '/Camp/CreateCamp',data,
         {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),});

    }
    deleteCamp(campId:number){

        return this.http.delete(this.Url+`/Camp/DeleteCamp/${campId}`, {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),
          });
       
    }  
    updateCamp(camp:Camp)
    {
        return this.http.put(this.Url+'/Camp/UpdateCamp',  camp,
         {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
            }),})
    }
    getFilteredCamps(checkin: any, checkout: any, Capacity: any) {
        return this.http.get(this.Url + `/Camp/GetCampsBetween/${checkin}/${checkout}/${Capacity}`)
      }
  
  
}