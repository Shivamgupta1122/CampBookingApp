import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camp } from '../Models/camp.model';
import { CampService } from '../Service/camp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../Service/error-handler.service';
@Component({
  selector: 'app-camp-list',
  templateUrl: './camp-list.component.html',
  styleUrls: ['./camp-list.component.css']
})
export class CampListComponent implements OnInit {
    checkInControl: FormControl
    checkOutControl : FormControl
    capacityControl : FormControl
    checkIn: any
    checkOut :any
    capacity : any
    page :number =1  
    loadingComplete : boolean = false
    totalRecords : number
    selectedValue:any
    filterData :any
    public errorMessage: string = ''
    // camps: ICamp[]
    FilterCamps : FormGroup
    constructor(private readonly service:CampService,private readonly router:Router,private errorHandler: ErrorHandlerService) { 
    }
    CampList:Camp[];
    ngOnInit() {
      this.checkIn = this.getDate(new Date(new Date().getTime()))    
      this.checkOut = this.getDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      this.capacity = 0
      this.allFilteredCamps(this.checkIn,this.checkOut,this.capacity)
      this.FilteredCampsInit()
      this.getAllCamps()
    }
    FilteredCampsInit() {
      this.checkInControl = new FormControl(this.checkIn,[Validators.required])
      this.checkOutControl = new FormControl(this.checkOut,[Validators.required])
      this.capacityControl = new FormControl('',[Validators.required])
      this.FilterCamps = new FormGroup({
        checkInDate :this.checkInControl,
        checkOutDate: this.checkOutControl,
        capacity: this.capacityControl
      })
    }
    allFilteredCamps(checkin, checkout, Capacity) {
      console.log(checkin,checkout,Capacity)
      this.service.getFilteredCamps(checkin,checkout,Capacity).
      subscribe((res:Camp[])=>{
        this.CampList = res;
        if(res){
          this.totalRecords = res.length
        }
        this.loadingComplete = true ;
        console.log("res")
        console.log(res)
      },
      (error) =>{
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
      );
    }
    getDate(d) {
      var output = d.getFullYear() + '-' +
          ((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1) + '-' +
          (d.getDate()<10 ? '0' : '') + d.getDate();
      return output ;
    }  
    getAllCamps(){
      this.service.getAllDashboardCamps().subscribe((camps:Camp[]) => {
        this.CampList = camps;
         console.log(this.CampList);
      },
      (error) =>{
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
      )
    }
    navigateToCreateCamp(){
      this.router.navigateByUrl('/Api/Camp/CreateCamp')
    }
    onFormSubmit(){
      const{checkInDate,checkOutDate,capacity} = this.FilterCamps.value;
      this.loadingComplete = false ;
      this.allFilteredCamps(checkInDate,checkOutDate,capacity);
    }
    getControlValidationClasses(control: FormControl) {
      return {
        'is-invalid': control.touched && control.invalid,
        'is-valid': control.touched && control.valid
      };
    }
    populateFilter():number[]{
      return Array.from({length: 10}, (x,i) => i+1);
    }
    bookMyCamp(camp:Camp) {
      console.log("camp")
      console.log(camp)
      console.log("camp id")
      console.log(camp.id)
      this.router.navigate(['/bookCamp',camp.id]);
    }
}